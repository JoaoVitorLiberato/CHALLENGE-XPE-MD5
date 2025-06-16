import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository.domain.repositories";
import { UserFactory } from "../../Domain/Factory/UserFactory.domain.factory";
import { UserEntity } from "../../Domain/Entities/UserEntity.domain.entities";

interface UserRepository extends IUserRepository {}

@injectable()
export class UserUseCase {
  constructor(
    @inject("IUserRepository")
      private readonly repository: UserRepository
  ) {}

  async create(data: UserEntity): Promise<UserEntity|string> {
    const dto = UserFactory.save(data);
    return this.repository.create(dto);
  }

  async findByEmail(email: string): Promise<any|string> {
    return this.repository.findByEmail(email);
  }
}