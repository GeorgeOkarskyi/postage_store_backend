import { PrimaryKey, OneToMany, Property, Collection, Entity, Ref } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from './cartItem.entity'

@Entity()
export class Cart {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuidv4();

    @Property({ type: 'uuid' })
    userId!: string;

    @Property()
    isDeleted!: boolean;

    @Property()
    total!: number;

    @OneToMany(() => CartItem, item => item.cart, { orphanRemoval: true })
    items = new Collection<CartItem>(this);

    constructor({ userId, isDeleted, total }: { userId: string, isDeleted: boolean, total: number }) {
        this.userId = userId;
        this.isDeleted = isDeleted;
        this.total = total;
    }
}