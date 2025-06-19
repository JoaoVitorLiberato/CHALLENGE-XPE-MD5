import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";

export interface IEventPublishContract {
  publish(data: OrderEntity): Promise<void>;
}