import RouteFromUniversity from '../models/RouteFromUniversity';
import { routesWithDriverName } from '../libs/driverName';
import { getAvilableSeats } from '../libs/vehicleService';
import RoutePropertiesFromUniversity from '../models/RoutesPropertiesFromUniversity'


export const createRoute = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {destination, city, description, departureDate, departureTime, availableSeats, vehicleId } = req.body;

    const seats = await getAvilableSeats(vehicleId, availableSeats, token);

      if (seats) return res.status(400).json({ error: 'No hay suficientes asientos disponibles en el vehículo' });
  
    const newRoute = new RouteFromUniversity({
      destination,
      city,
      description,
      departureDate,
      departureTime,
      availableSeats,
      vehicleId,
      driverUserId: req.user.id,
    });


    const savedRoute = await newRoute.save();
    res.status(201).json({ savedRoute, meessage: "¡Ruta creada exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAllRoutes = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const routes = await RouteFromUniversity.find();

    const driverName = await routesWithDriverName(routes, token);

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

    // Buscar los recorridos por la ciudad especificada
    const routes = await RouteFromUniversity.find({ city: cityName });

    const routesDriverName = await routesWithDriverName(routes, token);

    if (routesDriverName.length === 0) {
      res.status(200).json({ message: 'Todavía no hay rutas disponibles para: ', cityName });
    }

    res.status(200).json(routesDriverName);
  } catch (error) {
    console.error('Error al buscar recorridos por ciudad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutePropertiesFromUniversity = async (req, res) => {
  try {
    const routes = await RouteFromUniversity.find();

    const uniqueCities = [...new Set(routes.map(route => route.city))];

    const routePropertiesByCity = [];

    for (const city of uniqueCities) {
      const routesInCity = routes.filter(route => route.city === city);

      const numberRoutes = routesInCity.length;

      const numberDrivers = new Set(routesInCity.map(route => route.driverUserId)).size;

      const numberSeats = routesInCity.reduce((totalSeats, route) => totalSeats + route.availableSeats, 0);

      const destinations = routesInCity.map(route => route.destination);

      const routeProperties = new RoutePropertiesFromUniversity(city, numberRoutes, numberDrivers, numberSeats, destinations);

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
    const routes = await RouteFromUniversity.find({ _id: routeId } );

    const routesDriverName = await routesWithDriverName(routes, token);

    res.status(200).json(routesDriverName);
  } catch (error) {
    console.error('Error al buscar recorridos por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};