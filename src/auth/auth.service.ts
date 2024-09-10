import { INVALID_EMAIL_OR_PASSWORD_MESSAGE, ServerResponseCodes, USER_ALREADY_EXISTS_MESSAGE } from "../constants";
import { ExpressError } from "../shared-entities/error.entity";
import { loginResponce } from "../shared-entities/responce.entity";
import { UserEntity, UserRole } from "../shared-entities/user.entity";
import { AuthRepository } from "./auth.repository";
import * as jwt from 'jsonwebtoken';

class AuthService {
    constructor (private authRepository: AuthRepository) {}

    async register(email: string, password: string, role: UserRole): Promise<UserEntity> {

        const existingUser = await this.authRepository.findUserByEmail(email);

        if (existingUser) {
            throw new ExpressError( {message: USER_ALREADY_EXISTS_MESSAGE, status: ServerResponseCodes.Conflict});
        }
        
        const createUserResponce = await this.authRepository.createUser({email, password, role});


        return new UserEntity(createUserResponce);
    }

    async login(email: string, password: string): Promise<loginResponce> {
        const user = await this.authRepository.validatePassword(email, password);

        if(!user) {
            throw new ExpressError( {message: INVALID_EMAIL_OR_PASSWORD_MESSAGE, status: ServerResponseCodes.Conflict});
        }

        const token = jwt.sign(
            { id: user.id, email, role: user.role },
            process.env.TOKEN_KEY!,
            {
                expiresIn: "2h",
            }
        );

        return new loginResponce(token);
    }
}

const authRepository = new AuthRepository();

export default new AuthService(authRepository);