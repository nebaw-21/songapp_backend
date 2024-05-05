import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/UserController.js';
const router = express.Router();

// Define route handlers
 router.post('/register', registerUser);
 router.post('/login', loginUser);
router.get('/getUser', getUser);


export default router;
