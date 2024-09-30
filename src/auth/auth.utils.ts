import * as jwt from 'jsonwebtoken';
import { EXPIRES_IN_VALUE } from './auth.constants';
import { UserRole } from '../shared-entities/user.entity';

export const signToken = ({ userId, email, userRole }:
  { userId: string, email: string, userRole: UserRole }) => jwt.sign(
  { id: userId, email, role: userRole },
    process.env.TOKEN_KEY!,
    {
      expiresIn: EXPIRES_IN_VALUE,
    },
);

export const verifyToken = (token: string) => jwt.verify(token, process.env.TOKEN_KEY!);
