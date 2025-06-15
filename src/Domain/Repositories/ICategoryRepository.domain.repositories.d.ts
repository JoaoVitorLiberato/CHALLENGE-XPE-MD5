import { CategoryEntity } from "../Entities/CategoryEntity.domain.entities";

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]|string>;
  findById(id: string): Promise<CategoryEntity|string>;
  findByName(name: string): Promise<CategoryEntity|string>;
  create(data: CategoryEntity): Promise<CategoryEntity|string>;
  update(id: string, data: CategoryEntity): Promise<CategoryEntity|string>;
  delete (id: string): Promise<string>;
}
