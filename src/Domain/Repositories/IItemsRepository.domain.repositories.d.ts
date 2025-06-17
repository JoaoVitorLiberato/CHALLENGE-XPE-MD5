import { ItemsOrderEntity } from "../Entities/ItemsOrderEntity.domain.entities";

export interface IItemsRepository {
  findAll(): Promise<ItemsOrderEntity[]|string>;
  findById(id: string): Promise<ItemsOrderEntity|string>;
  create(data: ItemsOrderEntity): Promise<ItemsOrderEntity|string>;
  update(id: string, data: ItemsOrderEntity): Promise<ItemsOrderEntity|string>;
  delete(id: string): Promise<string>;
  count(id: string): Promise<number|string>;
}