import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { ResponseDTO } from '../models/responce.entity';

class AuthController {
    public async registerUser (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, role } = req.body;

            const registerResponce = await AuthService.register(email, password, role);

            res.send(new ResponseDTO({ data: registerResponce }));
        } catch (error) {
            return next(error);
        }
    }

    public async loginUser (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const loginResponce = await AuthService.login(email, password);

            res.send(new ResponseDTO({ data: loginResponce }));
        } catch (error) {
            return next(error);
        }
    }
}

export default new AuthController();