import { OrderEntity } from "../Entities/OrderEntity.domain.entities";

export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]|string>;
  findById(id: string): Promise<OrderEntity|string>;
  create(data: OrderEntity): Promise<OrderEntity|string>;
  update(id: string, data: OrderEntity): Promise<OrderEntity|string>;
  delete(id: string): Promise<string>;
  count(): Promise<number|string>;
}
