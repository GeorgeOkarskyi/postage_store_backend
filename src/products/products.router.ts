import ProductsController from './products.controller';
import { Router } from 'express';

export const productsRouter = Router();

const { requestProducts, requestProduct } = ProductsController;

productsRouter.get('/', requestProducts);
productsRouter.get('/:productId', requestProduct);
