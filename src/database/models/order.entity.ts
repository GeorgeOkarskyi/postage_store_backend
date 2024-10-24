import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItem } from './cartItem.entity';
import { Delivery } from '../../shared-entities/delivery.entity';
import { ORDER_STATUS } from '../../shared-entities/order.entity';
import { Payment } from '../../shared-entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Order {
    @PrimaryKey({ type: 'uuid' })
      id: string = uuidv4();

    @Property({ type: 'uuid' })
      userId!: string;

    @Property({ type: 'uuid' })
      cartId!: string;

    @Property()
      comments!: string;

    @Enum(() => ORDER_STATUS)
      status!: ORDER_STATUS;

    @Property()
      total!: number;

    @Property({ type: 'json' })
      payment!: Payment;

    @Property({ type: 'json' })
      delivery!: Delivery;

    @OneToMany(() => CartItem, item => item.order, { nullable: true })
      items = new Collection<CartItem>(this);

    constructor (
      { userId, cartId, status, total, comments, items, payment, delivery }:
        {
            userId: string,
            cartId: string,
            status: ORDER_STATUS,
            total: number,
            comments: string,
            items: Collection<CartItem>,
            payment: Payment,
            delivery: Delivery
        }) {
      this.userId = userId;
      this.cartId = cartId;
      this.status = status;
      this.total = total;
      this.comments = comments;
      this.items = items;
      this.delivery = delivery;
      this.payment = payment;
    }
}
