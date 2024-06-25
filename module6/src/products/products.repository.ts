import { ProductEntity } from '../models/product.entity';
import { findItemsInCsv, getItemsFromCsv } from '../storage/storage';
import { ExpressError } from '../models/error.entity';
import { ServerResponseCodes, NO_PRODUCT_FOUND_MESSAGE} from '../constants';
import { PRODUCT_CSV_FILE_PATH } from '../storage/storage.constants';

export class ProductDAL {
    async getProducts(): Promise<ProductEntity[]> {
        const productsResponce: ProductEntity[] = await getItemsFromCsv<ProductEntity>(PRODUCT_CSV_FILE_PATH);

        return productsResponce;
    }

    async getProduct(productId: string): Promise<ProductEntity> {
        const productResponce = (await findItemsInCsv<ProductEntity>(PRODUCT_CSV_FILE_PATH, (item: ProductEntity) => item.id === productId))[0];

        if(!productResponce) {
            throw new ExpressError({message: NO_PRODUCT_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }
        
        return new ProductEntity(productResponce);
    }
}