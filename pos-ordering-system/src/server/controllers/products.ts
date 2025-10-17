import { Request, Response } from 'express';
import { Product } from '../models/Product';

export class ProductsController {
    public async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, price } = req.body;
            const newProduct = await Product.create({ name, price });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error adding product', error });
        }
    }

    public async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    }
}