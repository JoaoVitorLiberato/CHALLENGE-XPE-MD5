import { ItemsOrderEntity } from "./ItemsOrderEntity.domain.entities";

export class OrderEntity {
  constructor(
    public readonly clientId: string,
    public readonly status: string,
    public readonly total: number,
    public readonly items: ItemsOrderEntity[],
    public readonly id?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
