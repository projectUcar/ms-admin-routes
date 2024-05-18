import {Router} from 'express'
import * as routerFromUniversityCtrl from '../controllers/routeFromUniversity.controller';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas por autenticación
router.post('/create-route', authenticateUser, routerFromUniversityCtrl.createRoute);
router.get('/get-routes', authenticateUser, routerFromUniversityCtrl.getAllRoutes);
router.get('/city/:cityName', authenticateUser, routerFromUniversityCtrl.findRoutesByCity);
router.get('/properties', authenticateUser, routerFromUniversityCtrl.getRoutePropertiesFromUniversity);
router.get('/id/:routeId', authenticateUser, routerFromUniversityCtrl.getRoutesById)

export default router;