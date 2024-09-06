import { ProductEntity } from '../models/product.entity';
import { ExpressError } from '../models/error.entity';
import { ServerResponseCodes, NO_PRODUCT_FOUND_MESSAGE} from '../constants';

import { DI } from '../server';

export class ProductDAL {
    async getProducts(): Promise<ProductEntity[]> {
        const productsResponce = (await DI.product.findAll())
            .map((product) => new ProductEntity({...product, id: product.id as string}));

        return productsResponce;
    }

    async getProduct(productId: string): Promise<ProductEntity> {
        const productResponce = await DI.product.findOneOrFail({ id: productId }, { failHandler: () => {
            throw new ExpressError({message: NO_PRODUCT_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }});
        
        return new ProductEntity({...productResponce, id: productResponce.id as string});
    }
}