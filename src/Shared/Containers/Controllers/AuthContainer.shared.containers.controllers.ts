import { container } from "tsyringe";
import { IUserAuthContract } from "../../../Application/Contracts/IUserAuthContract.application.contracts";
import { UserService } from "../../../Application/Services/UserService.application.services";
import { AuthService } from "../../../Application/Services/AuthService.application.services";
import { UserUseCase } from "../../../Application/UseCases/UserUseCase.application.usecases";

container.register<IUserAuthContract>("IUserAuthContract", {
  useClass: UserService,
});

container.registerSingleton<UserService>(UserService);
container.registerSingleton<UserUseCase>(UserUseCase);
container.registerSingleton<AuthService>(AuthService);