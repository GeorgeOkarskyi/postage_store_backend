import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config() 
import config from './config/orm.config'
import { initORM, Services } from './database/postgre';
import { authenticate } from './middlewares/authenticate.middleware';
import { appRouter } from './app.router';
import { errorHandler } from './middlewares/errorHandler.middleware'
import { RequestContext } from '@mikro-orm/core';

export const app = express();
const port = process.env.PORT || 3001;

export let DI = {} as Services;

export const init = (async() => {
    DI = await initORM(config);

    app.use(express.json());
    app.use(authenticate);
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    app.use('/api', appRouter);

    app.use(errorHandler);

    DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
    });
})();
