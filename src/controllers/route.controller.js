import Route from '../models/Route';
import User from '../models/User';

export const createRoute = async (req, res) => {
  try {
    const { origin, destination, description, departureTime, availableSeats } = req.body;
    const driverUserId = req.userId; // Extraemos el ID del usuario conductor del token

    const route = new Route({ origin, destination, description, departureTime, availableSeats, driverUserId });
    await route.save();

    res.status(201).json({ message: 'Ruta creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate('driverUserId', 'firstName lastName');
    res.json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};