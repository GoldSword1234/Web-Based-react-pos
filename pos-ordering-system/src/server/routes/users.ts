import { Router } from 'express';
import { UsersController } from '../controllers/users';

const router = Router();
const usersController = new UsersController();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router;