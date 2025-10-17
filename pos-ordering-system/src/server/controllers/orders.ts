import { Request, Response } from 'express';
import { Order } from '../models/Order';

export class OrdersController {
    public async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const orderData = req.body;
            const newOrder = await Order.create(orderData);
            return res.status(201).json(newOrder);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating order', error });
        }
    }

    public async getOrders(req: Request, res: Response): Promise<Response> {
        try {
            const orders = await Order.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving orders', error });
        }
    }
}