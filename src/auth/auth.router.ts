import { Router } from 'express';
import AuthController from './auth.controller';
import { validatRequestBody } from '../middlewares/validation.middleware'

export const authRouter = Router();

const { registerUser, loginUser } = AuthController;

authRouter.post('/register', validatRequestBody, registerUser);
authRouter.post('/login', validatRequestBody, loginUser);
