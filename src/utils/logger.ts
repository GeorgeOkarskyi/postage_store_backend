import { Logger, createLogger, format, transports } from 'winston';
import { PRODUCTION_ENVIRONMENT_NAME } from '../constants';
import { TransformableInfo } from 'logform';

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { combine, timestamp: timestampFormat, printf, colorize } = format;

const logFormat = printf((info: TransformableInfo) => {
  const { level, message, timestamp, serviceLavel, ...metadata } = info;
  let msg = `${timestamp} [${level}] `;

  if (serviceLavel) {
    msg += `[${serviceLavel}]: `;
  }

  msg += message;

  if (Object.keys(metadata).length) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

const logger: Logger = createLogger({
  level: process.env.NODE_ENV === PRODUCTION_ENVIRONMENT_NAME ? 'info' : 'debug',
  format: combine(
    timestampFormat({ format: TIMESTAMP_FORMAT }),
    colorize(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
