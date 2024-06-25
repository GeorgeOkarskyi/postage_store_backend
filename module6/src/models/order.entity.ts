import { CartItemEntity } from './cart.entity';

export type ORDER_STATUS = 'created' | 'completed';

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

interface IDeliveryParams {
  type: string,
  address: any,
}
export class Delivery {
  public type: string;
  public address: any;

  constructor({type, address}: IDeliveryParams) {
    this.type = type;
    this.address = address;
  }
}
interface IPaymentParams {
  type: string,
  address?: any,
  creditCard?: any,
}

export class Payment {
  public type: string;
  public address: any;
  public creditCard: any;

  constructor({type, address, creditCard}: IPaymentParams) {
    this.type = type;
    this.address = address;
    this.creditCard = creditCard;
  }
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

  constructor({id, userId, cartId, items, payment, delivery, comments, status, total}: IOrderEntityParams) {
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