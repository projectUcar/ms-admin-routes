import Route from '../models/Route';

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
    res.status(201).json({savedRoute, meessage: "¡Ruta creada exitosamente!"});
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