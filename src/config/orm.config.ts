import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

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
};

export default config;