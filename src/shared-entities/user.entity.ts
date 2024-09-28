export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}
export interface IUserEntity {
    id: string;
    email: string;
    role: UserRole;
}

export class UserEntity {
  public id: string;
  public email: string;
  public role: string;

  constructor ({ id, email, role }: IUserEntity) {
    this.id = id;
    this.email = email;
    this.role = role;
  }
}
