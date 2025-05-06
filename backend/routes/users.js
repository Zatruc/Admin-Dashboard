import express from 'express';
import { registerUser, loginUser } from '../controllers/users.js';
import { validateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// route to register a new user
router.post('/register', registerUser);

// route to login a user
router.post('/login', loginUser);

router.get('/', validateToken, isAdmin);

export default router;
