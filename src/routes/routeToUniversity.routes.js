import {Router} from 'express'
import * as routeToUvnicersityCtr  from '../controllers/routeToUniversity.controller';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas por autenticación
router.post('/create-route', authenticateUser, routeToUvnicersityCtr.createRoute);
router.get('/get-routes', authenticateUser, routeToUvnicersityCtr.getAllRoutes);
router.get('/city/:cityName', authenticateUser, routeToUvnicersityCtr.findRoutesByCity);
router.get('/properties', authenticateUser, routeToUvnicersityCtr.getRoutePropertiesFromUniversity);
router.get('/id/:routeId', authenticateUser, routeToUvnicersityCtr.getRoutesById);

export default router;