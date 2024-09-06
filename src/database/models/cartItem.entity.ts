import { PrimaryKey, ManyToOne, Property, Entity, Ref, ManyToMany } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { Cart } from './cart.entity';
import { Product } from './product.entity'
import { Order } from "./order.entity";

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => Product, {primary: true, ref: true})
  product!: Ref<Product>;

  @ManyToOne(() => Cart )
  cart!: Cart;

  @ManyToOne(() => Order )
  order!: Order;

  @Property()
  count!: number;

  constructor(count: number, cart: Cart) {
    this.count = count;
    this.cart = cart;
  }
}