import { Request, Response, NextFunction } from 'express';
import ProductsService from './products.service';
import { ResponseDTO } from '../shared-entities/responce.entity';

class ProductsController {
    async requestProducts(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const productsResponce = await ProductsService.getProducts();
            
            res.send(new ResponseDTO({ data: productsResponce }));
        } catch (error) {
            return next(error);
        }
    }

    async requestProduct({ params: { productId } }: Request, res: Response, next: NextFunction) {
        try {
            const productResponce = await ProductsService.getProduct(productId);
            
            res.send(new ResponseDTO({ data: productResponce }));
        } catch (error) {
            return next(error);
        }
    }
}

export default new ProductsController();