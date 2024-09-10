import { Response, NextFunction } from 'express';
import CartService from './cart.service';
import { ResponseDTO } from '../shared-entities/responce.entity';
import { ApiRequest } from '../middlewares/authenticate.middleware';

class CartController {
    public async requestUserCart({ user }: ApiRequest, res: Response, next: NextFunction) {
        try {
            const userId = user?.id as string;
            const userCart = await CartService.getUserCart(userId);

            res.send(new ResponseDTO({ data: userCart }));
        } catch (error) {
            return next(error);
        }
    }

    public async updateUserCart({ body, user }: ApiRequest, res: Response, next: NextFunction) {
        try {
            const userId = user?.id as string;
            const updateUserCartResponce = await CartService.updateUserCart(userId, body)

            res.send(new ResponseDTO({ data: updateUserCartResponce }));
        } catch (error) {
            return next(error);
        }
    }

    public async emptyUserCart({ user }: ApiRequest, res: Response, next: NextFunction) {
        try {
            const userId = user?.id as string;

            const emptyUserCartResponce = await CartService.emptyUserCart(userId);

            res.send(new ResponseDTO({ data: emptyUserCartResponce }));
        } catch (error) {
            return next(error);
        }
    }

    public async chackoutUserCart({ user, body }: ApiRequest, res: Response, next: NextFunction) {
        try {
            const userId = user?.id as string;

            const chackoutUserCartResponse = await CartService.chackoutUserCart(userId, body);

            res.send(new ResponseDTO({ data: chackoutUserCartResponse }));
        } catch (error) {
            return next(error);
        }
    }
}

export default new CartController();