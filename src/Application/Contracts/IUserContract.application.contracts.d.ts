import { UserEntity } from "@/Domain/Entities/UserEntity.domain.entities";

export interface IUserContract {
  findByEmail (email: string): Promise<UserEntity|string>;
}