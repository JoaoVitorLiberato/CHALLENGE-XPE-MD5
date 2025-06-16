import { ProductEntity } from "../Entities/ProductEntity.domain.entities";

export interface IProductRepository {
  findAll (): Promise<ProductEntity[]|string>;
  count (): Promise<number|string>;
  findById (id: string): Promise<ProductEntity|string>;
  findByName (name: string): Promise<ProductEntity|string>;
  create (product: ProductEntity): Promise<ProductEntity|string>;
  update (id: string, product: ProductEntity): Promise<ProductEntity|string>;
  delete (id: string): Promise<string>;
}