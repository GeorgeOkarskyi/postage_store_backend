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
  total?: number;
}

export class CartEntity {
  public id: string;
  public userId: string;
  public isDeleted: boolean | string;
  public items: CartItemEntity[];
  public total: number;

  constructor({id, userId, isDeleted, items, total}: ICartEntity){
    this.id = id;
    this.userId = userId;
    this.isDeleted = isDeleted === 'true';
    this.items = items;
    this.total = total;
  }
}