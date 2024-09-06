import { PrimaryKey, Property, Entity, t } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Product {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuidv4();

    @Property()
    title!: string;

    @Property()
    description!: string;

    @Property()
    price!: number;

    constructor({ title, description, price }: { title: string, description: string, price: number}) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
}