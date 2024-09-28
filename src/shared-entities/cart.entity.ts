import { CartItemEntity } from './cart-item.entity';

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

  constructor ({ id, userId, isDeleted, items, total }: ICartEntity) {
    this.id = id;
    this.userId = userId;
    this.isDeleted = isDeleted === 'true';
    this.items = items;
    this.total = total;
  }
}
