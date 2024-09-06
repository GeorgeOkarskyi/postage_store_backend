import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../models/product.entity';
import { EntityManager } from '@mikro-orm/core';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const products = [
            { title: 'Product 1', description: 'Description 1', price: 100 },
            { title: 'Product 2', description: 'Description 2', price: 200 },
        ];

        for (const product of products) {
            em.create(Product, product);
        }
    }
} 
