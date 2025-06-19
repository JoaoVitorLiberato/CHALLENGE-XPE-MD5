import { container } from "tsyringe";
import { OrderService } from "../../../Application/Services/OrderService.application.services";
import { OrderUseCase } from "../../../Application/UseCases/OrderUseCase.application.usecase";
import { OrderRepository } from "../../../Infrastructure/Repositories/OrderRepository.infrastructure.respositories";
import { IOrderRepository } from "../../../Domain/Repositories/IOrderRepository.domain.repositories";
import { RedisPublish } from "../../../Infrastructure/Redis/RedisPublish.infrastucture.redis";
import { IProductContract } from "../../../Application/Contracts/IProductContract.application.contracts";
import { ProductService } from "../../../Application/Services/ProductService.application.services";

container.register<IOrderRepository>("IOrderRepository", { useClass: OrderRepository });
container.register<IProductContract>("IProductContract", { useClass: ProductService });

container.registerSingleton<RedisPublish>(RedisPublish);
container.registerSingleton<OrderUseCase>(OrderUseCase);
container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<OrderService>(OrderService);
