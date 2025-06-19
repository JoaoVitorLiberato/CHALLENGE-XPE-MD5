import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";

export interface IEventSubscribeContract {
  subscribe(event: string, callback: (data: OrderEntity) => void): Promise<void>;
}