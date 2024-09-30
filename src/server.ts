import * as dotenv from 'dotenv';

dotenv.config();

import { PRODUCTION_ENVIRONMENT_NAME, SERVER_STARTED_MESSAGE } from './constants';
import { Services, initORM } from './database/postgre';
import { RequestContext } from '@mikro-orm/core';
import { appRouter } from './app.router';
import { authRouter } from './auth/auth.router';
import { authenticate } from './middlewares/authenticate.middleware';
import config from './config/orm.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import express from 'express';
import { healthcheckup } from './middlewares/healthcheckup.middleware';
import logger from './utils/logger';
import morgan from 'morgan';
import { registerShutdown } from './utils/shutdownHandler';


const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.ENVIRONMENT === PRODUCTION_ENVIRONMENT_NAME;

export let DI = {} as Services;

export const init = (async () => {
  DI = await initORM(config);

  app.use('/health', healthcheckup);

  if (isProduction) {
    app.use(morgan('combined', {
      stream: {
        write: message => logger.info(message.trim()),
      },
    }));
  } else {
    app.use(morgan('dev', {
      stream: {
        write: message => logger.debug(message.trim()),
      },
    }));
  }

  app.use(express.json());

  app.use((req, res, next) => RequestContext.create(DI.em, next));

  app.use('/auth', authRouter);
  app.use('/api', authenticate, appRouter);

  app.use(errorHandler);

  DI.server = app.listen(port, () => {
    logger.info(`${SERVER_STARTED_MESSAGE} http://localhost:${port}`);
  });

  registerShutdown(DI.server);
})();
