import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'storeDB',
  entities: ['dist/database/**/*.entity.js'],
  entitiesTs: ['src/database/**/*.entity.ts'],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  seeder: {
    pathTs: './src/database/seedings',
    path: './dist/database/seedings',
  },
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [ SeedManager, Migrator ],
};

export default config;