import { inject, injectable } from "tsyringe";
import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";
import { IOrderRepository } from "../../Domain/Repositories/IOrderRepository.domain.repositories";
import { OrderFactory } from "../../Domain/Factory/OrderFactory.domain.factory";

interface OrderRepository extends IOrderRepository {}

@injectable()
export class OrderUseCase {
  constructor(
    @inject("IOrderRepository")
      private readonly repository: OrderRepository
  ) {}

  async findAll(): Promise<OrderEntity[]|string> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<OrderEntity|string> {
    return this.repository.findById(id);
  }

  async create (order: OrderEntity): Promise<OrderEntity|string> {
    const dto = OrderFactory.save(order);
    return this.repository.create(dto);
  }

  async update(id: string, status: string): Promise<OrderEntity|string> {
    return this.repository.update(id, status);
  }

  async delete(id: string): Promise<string> {
    return this.repository.delete(id);
  }

  async count(): Promise<number|string> {
    return this.repository.count();
  }
}