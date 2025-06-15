import { container } from "tsyringe";
import { ClientService } from "../../../Application/Services/ClientService.application.services";
import { ClientUseCase } from "../../../Application/UseCases/ClientUseCase.application.usecases";
import { ClientRepository } from "../../../Infrastructure/Repositories/ClientRepository.infrastucture.repositories";

container.register("IClientRepository", {
  useClass: ClientRepository,
});

container.registerSingleton<ClientRepository>(ClientRepository);
container.registerSingleton<ClientService>(ClientService);
container.registerSingleton<ClientUseCase>(ClientUseCase);
