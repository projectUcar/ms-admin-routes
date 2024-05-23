import {Router} from 'express'
import * as requestSeatCtrl from '../controllers/requestSeat.controller';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/id/:idRoute', authenticateUser, requestSeatCtrl.requestSeat);

export default router;