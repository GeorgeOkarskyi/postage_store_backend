import { PrimaryKey, ManyToOne, Property, Entity, Ref, OneToOne } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { Cart } from './cart.entity';
import { Product } from './product.entity'
import { Order } from "./order.entity";

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => Product, { ref: true})
  product!: Product;

  @ManyToOne(() => Cart )
  cart!: Cart;

  @ManyToOne(() => Order, { nullable: true })
  order?: Order;

  @Property()
  count!: number;

  constructor(count: number, cart: Cart, product: Product, order?: Order) {
    this.count = count;
    this.cart = cart;
    this.product = product;
    this.order = order;
  }
}