import {
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  LOG_MESSAGE_INVALID_EMAIL_PASSWORD_ERROR,
  LOG_MESSAGE_LOGIN_END, LOG_MESSAGE_LOGIN_START,
  LOG_MESSAGE_REGISTER_END,
  LOG_MESSAGE_REGISTER_START,
  LOG_MESSAGE_USER_ALREADY_EXISTS_ERROR,
  USER_ALREADY_EXISTS_MESSAGE,
} from './auth.constants';
import {
  ServerResponseCodes, ServiceLevel,
} from '../constants';
import { UserEntity, UserRole } from '../shared-entities/user.entity';
import { AuthRepository } from './auth.repository';
import { ExpressError } from '../shared-entities/error.entity';
import logger from '../utils/logger';
import { loginResponce } from '../shared-entities/responce.entity';
import { signToken } from './auth.utils';

class AuthService {
  constructor (private authRepository: AuthRepository) {}

  async register (email: string, password: string, role: UserRole): Promise<UserEntity> {
    logger.debug(LOG_MESSAGE_REGISTER_START, { email, role, serviceLavel:  ServiceLevel.SERVICE });

    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      logger.error(LOG_MESSAGE_USER_ALREADY_EXISTS_ERROR, { email, serviceLavel:  ServiceLevel.SERVICE });

      throw new ExpressError({ message: USER_ALREADY_EXISTS_MESSAGE, status: ServerResponseCodes.Conflict });
    }

    const createUserResponce = await this.authRepository.createUser({ email, password, role });

    logger.info(LOG_MESSAGE_REGISTER_END, { email, role, serviceLavel:  ServiceLevel.SERVICE });

    return new UserEntity(createUserResponce);
  }

  async login (email: string, password: string): Promise<loginResponce> {
    logger.debug(LOG_MESSAGE_LOGIN_START, { email, serviceLavel:  ServiceLevel.SERVICE });

    const user = await this.authRepository.validatePassword(email, password);

    if (!user) {
      logger.error(LOG_MESSAGE_INVALID_EMAIL_PASSWORD_ERROR, { email, serviceLavel:  ServiceLevel.SERVICE });

      throw new ExpressError({ message: INVALID_EMAIL_OR_PASSWORD_MESSAGE, status: ServerResponseCodes.Conflict });
    }

    const token = signToken({ userId: user.id, email, userRole: user.role });

    logger.info(LOG_MESSAGE_LOGIN_END, { email, serviceLavel:  ServiceLevel.SERVICE });

    return new loginResponce(token);
  }
}

const authRepository = new AuthRepository();

export default new AuthService(authRepository);
