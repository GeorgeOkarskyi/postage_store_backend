import { ProductEntity } from '../models/product.entity';
import { ExpressError } from '../models/error.entity';
import { ServerResponseCodes, NO_PRODUCT_FOUND_MESSAGE} from '../constants';
import Product from '../database/models/product';

export class ProductDAL {
    async getProducts(): Promise<ProductEntity[]> {
        const productsResponce = (await Product.find().lean())
            .map((product) => new ProductEntity({...product, id: product._id as string}));

        return productsResponce;
    }

    async getProduct(productId: string): Promise<ProductEntity> {
        const productResponce = await Product.findById(productId).lean();

        if(!productResponce) {
            throw new ExpressError({message: NO_PRODUCT_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }
        
        return new ProductEntity({...productResponce, id: productResponce._id as string});
    }
}