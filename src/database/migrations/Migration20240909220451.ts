import { Migration } from '@mikro-orm/migrations';

export class Migration20240909220451 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` text not null, `email` text not null, `password` text not null, `role` text check (`role` in (\'admin\', \'user\')) not null default \'user\', primary key (`id`));');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');
  }

}
