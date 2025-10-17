import { Request, Response, NextFunction } from 'express';

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { userId, stationId, items } = req.body;
    if (!userId || !stationId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data' });
    }
    next();
};

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, price } = req.body;
    if (!name || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Invalid product data' });
    }
    next();
};

export const validateStation = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Invalid station data' });
    }
    next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Invalid user data' });
    }
    next();
};