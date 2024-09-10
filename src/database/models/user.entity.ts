import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../../shared-entities/user.entity';

@Entity()
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuidv4();
  
    @Property({ unique: true })
    email!: string;
  
    @Property()
    password!: string;
  
    @Enum(() => UserRole)
    role: UserRole = UserRole.USER;
  
    constructor(email: string, password: string, role: UserRole = UserRole.USER) {
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }