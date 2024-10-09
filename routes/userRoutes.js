import express from 'express';
import { registerUser, loginUser, getAllAdmins } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/admins', getAllAdmins);

export default router;
