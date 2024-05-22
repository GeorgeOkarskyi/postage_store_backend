import { ProductEntity } from "../models/product.entity";
import { ProductDAL } from './products.repository';

class ProductsService {
    private productDAL: ProductDAL

    constructor( productDAL: ProductDAL ) {
        this.productDAL = productDAL;
    }

    async getProducts(): Promise<ProductEntity[]> {
        const productsResponse = await this.productDAL.getProducts();

        return productsResponse;
    }

    async getProduct(productId: string): Promise<ProductEntity> {
        const productResponse = await this.productDAL.getProduct(productId);
        
        return productResponse;
    }
}


export default new ProductsService(new ProductDAL());