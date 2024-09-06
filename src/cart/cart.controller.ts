import { Request, Response, NextFunction } from 'express';
import CartService from './cart.service';
import { ResponseDTO } from '../models/responce.entity';
import { USER_ID_HEADER_KEY } from '../constants';

class CartController {
    public async requestUserCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.headers[USER_ID_HEADER_KEY] as string;
            const userCart = await CartService.getUserCart(userId);

            res.send(new ResponseDTO({ data: userCart }));
        } catch (error) {
            return next(error);
        }
    }

    // public async updateUserCart({ body, headers }: Request, res: Response, next: NextFunction) {
    //     try {
    //         const userId = headers[USER_ID_HEADER_KEY] as string;
    //         const updateUserCartResponce = await CartService.updateUserCart(userId, body)

    //         res.send(new ResponseDTO({ data: updateUserCartResponce }));
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // public async emptyUserCart({ headers }: Request, res: Response, next: NextFunction) {
    //     try {
    //         const userId = headers[USER_ID_HEADER_KEY] as string;

    //         const emptyUserCartResponce = await CartService.emptyUserCart(userId);

    //         res.send(new ResponseDTO({ data: emptyUserCartResponce }));
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // public async chackoutUserCart({ headers, body }: Request, res: Response, next: NextFunction) {
    //     try {
    //         const userId = headers[USER_ID_HEADER_KEY] as string;

    //         const chackoutUserCartResponse = await CartService.chackoutUserCart(userId, body);

    //         res.send(new ResponseDTO({ data: chackoutUserCartResponse }));
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
}

export default new CartController();