import { Options, defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { PRODUCTION_ENVIRONMENT_NAME } from '../constants';

const config: Options = defineConfig({
  host: process.env.MIKRO_ORM_HOST,
  port: Number(process.env.MIKRO_ORM_PORT),
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  dbName: process.env.MIKRO_ORM_DB_NAME,
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
  debug: process.env.ENVIRONMENT !== PRODUCTION_ENVIRONMENT_NAME,
  extensions: [ SeedManager, Migrator ],
});

export default config;