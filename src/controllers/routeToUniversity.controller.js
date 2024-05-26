import RouteToUniversity from '../models/RouteToUniversity';
import { routesWithDriverName, routesWithVehicle } from '../libs/routeInformation';
import { getAvilableSeats } from '../libs/vehicleService';
import RoutePropertiesToUniversity from '../models/RoutesPropertiesToUniversity';


export const createRoute = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { origin, city, description, departureDate, departureTime, availableSeats, vehicleId } = req.body;

    const seats = await getAvilableSeats(vehicleId, availableSeats, token);

    if (seats) return res.status(400).json({ error: 'No hay suficientes asientos disponibles en el vehículo' });

    const newRoute = new RouteToUniversity({
      origin,
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
    const routes = await RouteToUniversity.find();

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
    const routes = await RouteToUniversity.find({ city: cityName });

    const routesDriverName = await routesWithDriverName(routes, token);

    if (routesDriverName.length === 0) {
      res.status(204).json({ message: 'Todavía no hay rutas disponibles para: ', cityName });
      return;
    }

    res.status(200).json(routesDriverName);
  } catch (error) {
    console.error('Error al buscar recorridos por ciudad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};

export const getRoutePropertiesFromUniversity = async (req, res) => {
  try {
    const routes = await RouteToUniversity.find();

    const uniqueCities = [...new Set(routes.map(route => route.city))];

    const routePropertiesByCity = [];

    for (const city of uniqueCities) {
      const routesInCity = routes.filter(route => route.city === city);

      const numberRoutes = routesInCity.length;

      const numberDrivers = new Set(routesInCity.map(route => route.driverUserId)).size;

      const numberSeats = routesInCity.reduce((totalSeats, route) => totalSeats + route.availableSeats, 0);

      const origins = routesInCity.map(route => route.origin);

      const routeProperties = new RoutePropertiesToUniversity(city, numberRoutes, numberDrivers, numberSeats, origins);

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
    const route = await RouteToUniversity.find( { _id: routeId } );

    if (route.length === 0) {
      res.status(204).json({ message: 'No existe la ruta proporcionada'});
      return;
    }

    const routesDriverName = await routesWithDriverName(route, token);
    const routesVehicle = await routesWithVehicle(route[0], token);

    const routeInfo = {};
    routeInfo.route = routesDriverName[0];
    routeInfo.vehicle = routesVehicle;
    
    res.status(200).json(routeInfo);
  } catch (error) {
    console.error('Error al buscar recorridos por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getMyRoutes = async (req, res) => {

  try {
    const token = req.headers.authorization;
    const { driverUserId } = req.params;
    const routes = await RouteToUniversity.find( { driverUserId } );

    const routeInfo = await Promise.all(routes.map(async (route) => { 
        const vehicleInfo = await routesWithVehicle(route, token);
        const modifiedRouteInfo = { route };
        modifiedRouteInfo.vehicle = vehicleInfo;
        return modifiedRouteInfo;
    }));
    
    if (routeInfo.length === 0) {
      res.status(204).json({ message: 'No existe la ruta proporcionada'});
      return;
    }
    res.status(200).json(routeInfo);
  } catch (error) {
    console.error('Error al buscar mis recorridos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};