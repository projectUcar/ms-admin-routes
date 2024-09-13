import moment from 'moment';
import RouteToUniversity from '../models/RouteToUniversity';
import { routesWithDriverName, routesWithVehicle } from '../libs/routeInformation';
import { getAvilableSeats } from '../libs/vehicleService';
import RoutePropertiesToUniversity from '../models/RoutesPropertiesToUniversity';
import { filterRoutesByTodayAndTomorrow } from '../libs/dateUtils';

export const createRoute = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { destination, city, description, departureDate, departureTime, availableSeats, vehicleId } = req.body;

    const seats = await getAvilableSeats(vehicleId, availableSeats, token);

    if (seats) return res.status(400).json({ error: 'No hay suficientes asientos disponibles en el vehículo' });

    // Combina la fecha y la hora en formato AM/PM para crear el campo departureDateTime
    const departureDateTime = moment(`${departureDate} ${departureTime}`, 'YYYY-MM-DD h:mm A').toDate();

    const newRoute = new RouteToUniversity({
      destination,
      city,
      description,
      departureDate,
      departureTime,
      departureDateTime, // Aquí se guarda la fecha y hora combinadas
      availableSeats,
      vehicleId,
      driverUserId: req.user.id,
    });

    const savedRoute = await newRoute.save();
    res.status(201).json({ savedRoute, message: "¡Ruta creada exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAllRoutes = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const routes = await RouteToUniversity.find();

    const driverName = await routesWithDriverName(routes, token);

    res.status(200).json(driverName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutesToday = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const routes = await RouteToUniversity.find();
    const filteredRoutes = filterRoutesByTodayAndTomorrow(routes);

    const driverName = await routesWithDriverName(filteredRoutes, token);
    res.status(200).json(driverName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const findRoutesByCity = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { cityName } = req.params;

    const routes = await RouteToUniversity.find({ city: cityName });
    const filteredRoutes = filterRoutesByTodayAndTomorrow(routes);

    const routesDriverName = await routesWithDriverName(filteredRoutes, token);

    if (routesDriverName.length === 0) {
      res.status(204).json({ message: `Todavía no hay rutas disponibles para: ${cityName}` });
      return;
    }

    res.status(200).json(routesDriverName);
  } catch (error) {
    console.error('Error al buscar recorridos por ciudad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutePropertiesFromUniversity = async (req, res) => {
  try {
    const routes = await RouteToUniversity.find();
    const filteredRoutes = filterRoutesByTodayAndTomorrow(routes);
    const uniqueCities = [...new Set(routes.map(route => route.city))];

    const routePropertiesByCity = [];

    for (const city of uniqueCities) {
      const routesInCity = filteredRoutes.filter(route => route.city === city);

      const numberRoutes = routesInCity.length;
      const numberDrivers = new Set(routesInCity.map(route => route.driverUserId)).size;
      const numberSeats = routesInCity.reduce((totalSeats, route) => totalSeats + route.availableSeats, 0);
      const destinations = routesInCity.map(route => route.destination);

      const routeProperties = new RoutePropertiesToUniversity(city, numberRoutes, numberDrivers, numberSeats, destinations);
      routePropertiesByCity.push(routeProperties);
    }

    res.status(200).json(routePropertiesByCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutesById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { routeId } = req.params;
    const route = await RouteToUniversity.findById(routeId);

    if (!route) {
      res.status(204).json({ message: 'No existe la ruta proporcionada' });
      return;
    }

    const routesDriverName = await routesWithDriverName([route], token);
    const routesVehicle = await routesWithVehicle(route, token);

    const routeInfo = { route: routesDriverName[0], vehicle: routesVehicle };

    res.status(200).json(routeInfo);
  } catch (error) {
    console.error('Error al buscar recorridos por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutesDriver = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const driverUserId = req.user.id;
    const routes = await RouteToUniversity.find({ driverUserId });

    const routeInfo = await Promise.all(routes.map(async (route) => { 
      const vehicleInfo = await routesWithVehicle(route, token);
      return { route, vehicle: vehicleInfo };
    }));

    if (routeInfo.length === 0) {
      res.status(204).json({ message: 'No existe la ruta proporcionada' });
      return;
    }

    res.status(200).json(routeInfo);
  } catch (error) {
    console.error('Error al buscar mis recorridos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutesPassengers = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const passengerUserId = req.user.id;
    const routes = await RouteToUniversity.find({ 'passengers.user': passengerUserId });

    const routeInfo = await Promise.all(routes.map(async (route) => { 
      const vehicleInfo = await routesWithVehicle(route, token);
      return { route, vehicle: vehicleInfo };
    }));

    if (routeInfo.length === 0) {
      res.status(204).json({ message: 'No existe la ruta proporcionada' });
      return;
    }

    res.status(200).json(routeInfo);
  } catch (error) {
    console.error('Error al buscar mis recorridos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
