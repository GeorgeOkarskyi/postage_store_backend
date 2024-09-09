import { Router } from "express";
import { cartRouter } from './cart/cart.router';
import { productsRouter } from './products/products.router';
import { authRouter } from './auth/auth.router';

export const appRouter = Router();

appRouter.use('/products',productsRouter);
appRouter.use('/profile/cart', cartRouter);