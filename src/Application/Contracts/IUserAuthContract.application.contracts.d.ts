import { UserEntity } from "@/Domain/Entities/UserEntity.domain.entities";

export interface IUserAuthContract {
  findByEmail (email: string): Promise<UserEntity|string>;
}