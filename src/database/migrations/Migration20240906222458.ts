import { Migration } from '@mikro-orm/migrations';

export class Migration20240906222458 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `cart` (`id` text not null, `user_id` text not null, `is_deleted` integer not null, `total` integer not null, primary key (`id`));');

    this.addSql('create table `order` (`id` text not null, `user_id` text not null, `cart_id` text not null, `comments` text not null, `status` text not null, `total` integer not null, primary key (`id`));');

    this.addSql('create table `product` (`id` text not null, `title` text not null, `description` text not null, `price` integer not null, primary key (`id`));');

    this.addSql('create table `cart_item` (`id` text not null, `product_id` text not null, `cart_id` text not null, `order_id` text null, `count` integer not null, constraint `cart_item_product_id_foreign` foreign key(`product_id`) references `product`(`id`) on update cascade, constraint `cart_item_cart_id_foreign` foreign key(`cart_id`) references `cart`(`id`) on update cascade, constraint `cart_item_order_id_foreign` foreign key(`order_id`) references `order`(`id`) on delete set null on update cascade, primary key (`id`));');
    this.addSql('create index `cart_item_product_id_index` on `cart_item` (`product_id`);');
    this.addSql('create index `cart_item_cart_id_index` on `cart_item` (`cart_id`);');
    this.addSql('create index `cart_item_order_id_index` on `cart_item` (`order_id`);');
  }

}
