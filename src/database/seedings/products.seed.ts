import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../models/product.entity';
import { EntityManager } from '@mikro-orm/core';
import { productsData } from './products.data';

export class ProductSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        for (const product of productsData) {
            em.create(Product, product);
        }
    }
} 
