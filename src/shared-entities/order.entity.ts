import { CartItemEntity } from './cart-item.entity';
import { Delivery } from './delivery.entity';
import { Payment } from './payment.entity';

export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed'
}

export interface IOrderEntityParams {
  id: string,
  userId: string;
  cartId: string;
  items: CartItemEntity[]
  payment: Payment,
  delivery: Delivery,
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export class OrderEntity {
  public id: string;
  public userId: string;
  public cartId: string;
  public items: CartItemEntity[];
  public payment: Payment;
  public delivery: Delivery;
  public comments: string;
  public status: ORDER_STATUS;
  public total: number;

  constructor ({ id, userId, cartId, items, payment, delivery, comments, status, total }: IOrderEntityParams) {
    this.id = id;
    this.userId = userId;
    this.cartId = cartId;
    this.items = items;
    this.payment = payment;
    this.delivery = delivery;
    this.comments = comments;
    this.status = status;
    this.total = total;
  }
}
