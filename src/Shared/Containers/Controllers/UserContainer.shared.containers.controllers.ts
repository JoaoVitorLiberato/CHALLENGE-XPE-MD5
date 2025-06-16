import { container } from "tsyringe";
import { UserService } from "../../../Application/Services/UserService.application.services";
import { UserUseCase } from "../../../Application/UseCases/UserUseCase.application.usecases";
import { UserRepository } from "../../../Infrastructure/Repositories/UserRepository.infrastucture.repositories";
import { IUserRepository } from "../../../Domain/Repositories/IUserRepository.domain.repositories";

container.register<IUserRepository>("IUserRepository", {
  useClass: UserRepository,
});

container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);
container.registerSingleton<UserUseCase>(UserUseCase);