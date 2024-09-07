import { Migration } from '@mikro-orm/migrations';

export class Migration20240907233218 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `order` add column `payment` Payment not null;');
    this.addSql('alter table `order` add column `delivery` Delivery not null;');
  }

}
