import { UserEntity } from "../Entities/UserEntity.domain.entities";

export interface IUserRepository {
  create(data: UserEntity): Promise<UserEntity|string>;
  findByEmail(email: string): Promise<any|string>;
}
