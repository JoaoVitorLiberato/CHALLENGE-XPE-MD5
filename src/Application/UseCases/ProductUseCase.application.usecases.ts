import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository.domain.repositories";
import { ProductEntity } from "../../Domain/Entities/ProductEntity.domain.entities";
import { ProductFactory } from "../../Domain/Factory/ProductFactory.domain.factory";

interface ProductRepository extends IProductRepository {}

@injectable()
export class ProductUseCase {
  constructor(
    @inject("IProductRepository") 
      private readonly repository: ProductRepository
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity|string> {
    const dto = ProductFactory.save(product);
    return this.repository.create(dto);
  }

  async findAll(): Promise<ProductEntity[]|string> {
    return this.repository.findAll();
  }

  async count(): Promise<number|string> {
    return this.repository.count();
  }

  async findById(id: string): Promise<ProductEntity|string> {
    return this.repository.findById(id);
  }

  async findByName(name: string): Promise<ProductEntity|string> {
    return this.repository.findByName(name);
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity|string> {
    return this.repository.update(id, product);
  }

  async delete(id: string): Promise<string> {
    return this.repository.delete(id);
  }
}
