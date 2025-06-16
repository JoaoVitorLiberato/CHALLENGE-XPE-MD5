import { container } from "tsyringe";
import { ProductService } from "../../../Application/Services/ProductService.application.services";
import { ProductUseCase } from "../../../Application/UseCases/ProductUseCase.application.usecases";
import { ProductRepository } from "../../../Infrastructure/Repositories/ProductRepository.infrastucture.repositories";
import { IProductRepository } from "../../../Domain/Repositories/IProductRepository.domain.repositories";

container.register<IProductRepository>(
  "IProductRepository",
  {
    useClass: ProductRepository,
  }
);

container.registerSingleton<ProductUseCase>(ProductUseCase);
container.registerSingleton<ProductUseCase>(ProductUseCase);
container.registerSingleton<ProductService>(ProductService);
