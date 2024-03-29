import {Router} from 'express'
import { createRoute, getRoutes } from '../controllers/route.controller';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas por autenticación
router.post('/create-route', authenticateUser, createRoute);
router.get('/get-routes', authenticateUser, getRoutes);

export default router;