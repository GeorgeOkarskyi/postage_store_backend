import { Migration } from '@mikro-orm/migrations';

export class Migration20240914201037 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cart" ("id" uuid not null, "user_id" uuid not null, "is_deleted" boolean not null, "total" int not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "order" ("id" uuid not null, "user_id" uuid not null, "cart_id" uuid not null, "comments" varchar(255) not null, "status" text check ("status" in (\'created\', \'completed\')) not null, "total" int not null, "payment" jsonb not null, "delivery" jsonb not null, constraint "order_pkey" primary key ("id"));');

    this.addSql('create table "product" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("id" uuid not null, "product_id" uuid not null, "cart_id" uuid not null, "order_id" uuid null, "count" int not null, constraint "cart_item_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'admin\', \'user\')) not null default \'user\', constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_order_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_product_id_foreign";');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
