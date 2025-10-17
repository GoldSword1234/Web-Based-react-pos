import { Router } from 'express';
import ProductsController from '../controllers/products';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getProducts.bind(productsController));
router.post('/', productsController.addProduct.bind(productsController));

export default router;