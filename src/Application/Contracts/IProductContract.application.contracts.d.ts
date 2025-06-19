import { ProductEntity } from "../../Domain/Entities/ProductEntity.domain.entities";

export interface IProductContract {
  findById(id: string): Promise<ProductEntity>;
}
