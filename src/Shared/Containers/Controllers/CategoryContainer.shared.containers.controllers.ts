import { container } from "tsyringe";
import { CategoryService } from "../../../Application/Services/CategoryService.application.services";
import { CategoryUseCase } from "../../../Application/UseCases/CategoryUseCase.application.usecases";
import { CategoryRepository } from "../../../Infrastructure/Repositories/CategoryRepository.infrastructure.respositories";
import { ICategoryRepository } from "../../../Domain/Repositories/ICategoryRepository.domain.repositories";

container.register<ICategoryRepository>("ICategoryRepository", {
  useClass: CategoryRepository,
});

container.registerSingleton<CategoryRepository>(CategoryRepository);
container.registerSingleton<CategoryUseCase>(CategoryUseCase);
container.registerSingleton<CategoryService>(CategoryService);