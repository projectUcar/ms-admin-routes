import {Router} from 'express'
import { createRoute, getAllRoutes, findRoutesByCity, getRoutePropertiesFromUniversity } from '../controllers/route.controller';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas por autenticación
router.post('/create-route', authenticateUser, createRoute);
router.get('/get-routes', authenticateUser, getAllRoutes);
router.get('/city/:cityName', authenticateUser, findRoutesByCity);
router.get('/properties', authenticateUser, getRoutePropertiesFromUniversity);

export default router;