import { Router } from 'express';
import CartController from './cart.controller';
import { validatRequestBody } from '../middlewares/validation.middleware'

export const cartRouter = Router();

const { requestUserCart, updateUserCart, emptyUserCart, chackoutUserCart } = CartController;

cartRouter.get('/', requestUserCart);
cartRouter.put('/', validatRequestBody, updateUserCart);
cartRouter.delete('/', emptyUserCart);
cartRouter.post('/checkout', validatRequestBody, chackoutUserCart);