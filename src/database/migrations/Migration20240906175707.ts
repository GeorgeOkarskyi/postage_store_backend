import { Migration } from '@mikro-orm/migrations';

export class Migration20240906175707 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `cart` add column `total` integer not null;');
  }

}
