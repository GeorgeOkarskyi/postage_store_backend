import { ProductEntity } from './product.entity';

interface ICartItemEntity {
    product: ProductEntity;
    count: number;
    cartId: string;
    id: string;
  }

export class CartItemEntity {
  public cartId: string;
  public id: string;
  public product: ProductEntity;
  public count: number;

  constructor ({ product, count, cartId, id }: ICartItemEntity) {
    this.product = product;
    this.count = Number(count);
    this.cartId = cartId;
    this.id = id;
  }
}
