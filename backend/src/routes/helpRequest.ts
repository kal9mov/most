import { Router } from 'express';
import { submitHelpRequest } from '../controllers/helpRequestController';

const router = Router();

// POST /api/help-requests
// Middleware authMiddleware уже применен глобально, 
// так что submitHelpRequest получит req.user, если токен валиден
router.post('/', submitHelpRequest); 

export default router; 