import { container } from "tsyringe";
import { ProductService } from "../../../Application/Services/ProductService.application.services";
import { ProductUseCase } from "../../../Application/UseCases/ProductUseCase.application.usecases";
import { ProductRepository } from "../../../Infrastructure/Repositories/ProductRepository.infrastucture.repositories";
import { IProductRepository } from "../../../Domain/Repositories/IProductRepository.domain.repositories";
import { CategoryService } from "../../../Application/Services/CategoryService.application.services";
import { ICategoryContract } from "../../../Application/Contracts/ICategoryContract.applicaiton.contracts";

container.register<IProductRepository>(
  "IProductRepository",
  {
    useClass: ProductRepository,
  }
);

container.register<ICategoryContract>(
  "ICategoryContract",
  {
    useClass: CategoryService,
  }
);

container.registerSingleton<ProductUseCase>(ProductUseCase);
container.registerSingleton<ProductUseCase>(ProductUseCase);
container.registerSingleton<ProductService>(ProductService);
