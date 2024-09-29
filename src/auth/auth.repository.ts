import {
  LOG_MESSAGE_CREATE_USER_END,
  LOG_MESSAGE_CREATE_USER_START,
  LOG_MESSAGE_FIND_USER_BY_EMAIL_END,
  LOG_MESSAGE_FIND_USER_BY_EMAIL_ERROR,
  LOG_MESSAGE_FIND_USER_BY_EMAIL_START,
  LOG_MESSAGE_VALIDATE_PASSWORD_END,
  LOG_MESSAGE_VALIDATE_PASSWORD_ERROR,
  LOG_MESSAGE_VALIDATE_PASSWORD_START,
} from './auth.constants';
import { DI } from '../server';
import { ServiceLevel } from '../constants';
import { User } from '../database/models/user.entity';
import { UserRole } from '../shared-entities/user.entity';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

export class AuthRepository {
  async findUserByEmail (email: string): Promise<User | null> {
    logger.debug(LOG_MESSAGE_FIND_USER_BY_EMAIL_START, { email, serviceLavel:  ServiceLevel.REPOSITORY });

    const user = DI.user.findOne({ email });

    logger.info(LOG_MESSAGE_FIND_USER_BY_EMAIL_END, { email, serviceLavel:  ServiceLevel.REPOSITORY });

    return user;
  }

  async createUser ({ email, password, role }: {email: string, password: string, role: UserRole}): Promise<User> {
    logger.debug(LOG_MESSAGE_CREATE_USER_START, { email, serviceLavel:  ServiceLevel.REPOSITORY });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser  = new User(email, hashedPassword, role);

    await DI.em.persistAndFlush(newUser);

    logger.info(LOG_MESSAGE_CREATE_USER_END, { email, serviceLavel:  ServiceLevel.REPOSITORY });

    return newUser;
  }

  async validatePassword (email: string, password: string): Promise<User | null> {
    logger.debug(LOG_MESSAGE_VALIDATE_PASSWORD_START, { email, serviceLavel:  ServiceLevel.REPOSITORY });

    const user = await this.findUserByEmail(email);

    if (!user) {
      logger.error(LOG_MESSAGE_VALIDATE_PASSWORD_ERROR, { email, serviceLavel:  ServiceLevel.REPOSITORY });

      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      logger.info(LOG_MESSAGE_VALIDATE_PASSWORD_END, { email, serviceLavel:  ServiceLevel.REPOSITORY });

      return user;
    } else {
      logger.error(LOG_MESSAGE_VALIDATE_PASSWORD_ERROR, { email, serviceLavel:  ServiceLevel.REPOSITORY });

      return null;
    }
  }
}
