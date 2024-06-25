import { Router } from 'express';
import ProductsController from './products.controller';

export const productsRouter = Router();

const { requestProducts, requestProduct } = ProductsController;

productsRouter.get('/', requestProducts);
productsRouter.get('/:productId', requestProduct)