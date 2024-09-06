import { ProductEntity } from './product.entity'

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

  constructor({product, count, cartId, id}: ICartItemEntity){
    this.product = product;
    this.count = Number(count);
    this.cartId = cartId;
    this.id = id
  }
}

interface ICartEntity {
  id: string;
  userId: string;
  isDeleted: boolean | string;
  items: CartItemEntity[] | undefined;
  total: number;
}

export class CartEntity {
  public id: string;
  public userId: string;
  public isDeleted: boolean | string;
  public items: CartItemEntity[] | undefined;
  public total: number;

  constructor({id, userId, isDeleted, items, total}: ICartEntity){
    this.id = id;
    this.userId = userId;
    this.isDeleted = isDeleted === 'true';
    this.items = items;
    this.total = total;
  }
}