import { User } from "../database/models/user.entity";
import { UserRole } from "../models/user.entity";
import bcrypt from 'bcrypt';
import { DI } from '../server';

export class AuthRepository {

    async findUserByEmail (email: string): Promise<User | null> {
        return DI.user.findOne({email});
    }

    async createUser ({email, password, role}: {email: string, password: string, role: UserRole}): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = new User(email, hashedPassword, role);

        await DI.em.persistAndFlush(newUser);

        return newUser;
    }

    async validatePassword (email: string, password: string): Promise<User | null> {
        const user = await this.findUserByEmail(email);

        if(!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        return isPasswordValid ? user : null;
    }
}