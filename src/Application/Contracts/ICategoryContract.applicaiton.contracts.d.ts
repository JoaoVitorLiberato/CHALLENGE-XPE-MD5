import { CategoryEntity } from "../../Domain/Entities/CategoryEntity.domain.entities"

export interface ICategoryContract {
  findById (id: string): Promise<CategoryEntity|string>
}