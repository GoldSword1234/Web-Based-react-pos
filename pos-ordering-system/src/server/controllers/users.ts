import { Request, Response } from 'express';
import User from '../models/User';

class UsersController {
    async registerUser(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const newUser = await User.create({ username, password });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username, password } });
            if (user) {
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

export default new UsersController();