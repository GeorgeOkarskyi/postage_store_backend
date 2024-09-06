import { PrimaryKey, OneToMany, Property, Collection, Entity } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from './cartItem.entity'

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

    @Property()
    status!: string;

    @Property()
    total!: number;

    @OneToMany(() => CartItem, item => item.order, {nullable: true})
    items?: Collection<CartItem> = new Collection<CartItem>(this);

    constructor(userId: string, cartId: string, status: string, total: number) {
        this.userId = userId;
        this.cartId = cartId;
        this.status = status;
        this.total = total;
    }
}