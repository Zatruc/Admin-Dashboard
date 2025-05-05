import express from 'express';
import { registerUser } from '../controllers/users.js';
import { validateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// route to register a new user
router.post('/register', registerUser);

router.get('/', validateToken, isAdmin);

export default router;
