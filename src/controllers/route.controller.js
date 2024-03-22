import Route from '../models/Route';
import { getUserById } from '../libs/userService';

export const createRoute = async (req, res) => {
  try {
    const { origin, destination, city, description, departureDate, departureTime, availableSeats } = req.body;

    console.log(req.user.email);

    const newRoute = new Route({
      origin,
      destination,
      city,
      description,
      departureDate,
      departureTime,
      availableSeats,
      driverUserId: req.user.id,
    });


    const savedRoute = await newRoute.save();
    res.status(201).json({ savedRoute, meessage: "¡Ruta creada exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const routes = await Route.find();

    const routesWithDriverName = await Promise.all(routes.map(async route => {
      const driver = await getUserById(route.driverUserId, token);
      const driverName = driver ? `${driver.firstName} ${driver.lastName}` : 'Conductor no encontrado';
      const modifiedRoute = { ...route.toObject() };
      modifiedRoute.driverName = driverName;
      return modifiedRoute;
    }));

    res.json(routesWithDriverName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};