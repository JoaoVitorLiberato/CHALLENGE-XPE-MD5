import { injectable, inject } from "tsyringe";
import { CategoryEntity } from "../../Domain/Entities/CategoryEntity.domain.entities";
import { CategoryFactory } from "../../Domain/Factory/CategoryFactory.domain.factory";
import { ICategoryRepository } from "../../Domain/Repositories/ICategoryRepository.domain.repositories";

interface CategoryRepository extends ICategoryRepository {}

@injectable()
export class CategoryUseCase {
  constructor(
    @inject("ICategoryRepository")
      private readonly repository: CategoryRepository
  ) {}

  async create(data: CategoryEntity): Promise<CategoryEntity|string> {
    const dto = CategoryFactory.save(data);
    return this.repository.create(dto);
  }

  async findAll(): Promise<CategoryEntity[]|string> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<CategoryEntity|string> {
    return this.repository.findById(id);
  }

  async findByName(name: string): Promise<CategoryEntity|string> {
    return this.repository.findByName(name);
  }

  async update(id: string, data: CategoryEntity): Promise<CategoryEntity|string> {
    const dto = CategoryFactory.save(data);
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<string> {
    return this.repository.delete(id);
  }
}
