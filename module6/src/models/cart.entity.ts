import { ProductEntity } from './product.entity'

interface ICartItemEntity {
  product: ProductEntity;
  count: number;
}

export class CartItemEntity {
  public product: ProductEntity;
  public count: number;

  constructor({product, count}: ICartItemEntity){
    this.product = product;
    this.count = Number(count);
  }
}

interface ICartEntity {
  id: string;
  userId: string;
  isDeleted: boolean | string;
  items: CartItemEntity[];
}

export class CartEntity {
  public id: string;
  public userId: string;
  public isDeleted: boolean | string;
  public items: CartItemEntity[]

  constructor({id, userId, isDeleted, items}: ICartEntity){
    this.id = id;
    this.userId = userId;
    this.isDeleted = isDeleted === 'true';
    this.items = items
  }
}