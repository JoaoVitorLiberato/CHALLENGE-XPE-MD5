import { injectable } from "tsyringe";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository.domain.repositories";
import { ProductEntity } from "../../Domain/Entities/ProductEntity.domain.entities";
import { ProductModel } from "../Database/Models/ProductModel.infrastructure.database.models";
import { CategoryModel } from "../Database/Models/CategoryModel.infrastructure.database.models";

@injectable()
export class ProductRepository implements IProductRepository {
  async create(product: ProductEntity): Promise<ProductEntity|string> {
    return new Promise((resolve) => {
      ProductModel.create({ ...product })
        .then((product) => resolve(product as unknown as ProductEntity))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - create", error);
          resolve("error-create-product");
        });
    });
  }

  async findAll(): Promise<ProductEntity[]|string> {
    return new Promise((resolve) => {
      ProductModel.findAll({ attributes: { exclude: ["categoryId"] }, include: [CategoryModel] })
        .then((products) => resolve(products as unknown as ProductEntity[]))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - findAll", error);
          resolve("error-find-all-products");
        });
    });
  }

  async count(): Promise<number|string> {
    return new Promise((resolve) => {
      ProductModel.count()
        .then((count) => resolve(count as unknown as number))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - count", error);
          resolve("error-count-products");
        });
    });
  }

  async findById (id: string): Promise<ProductEntity|string> {
    return new Promise((resolve) => {
      ProductModel.findByPk(id, { attributes: { exclude: ["id", "categoryId"] }, include: [CategoryModel] })
        .then((product) => resolve(product as unknown as ProductEntity))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - findById", error);
          resolve("error-find-product-by-id");
        });
    });
  }

  async findByName(name: string): Promise<ProductEntity|string> {
    return new Promise((resolve) => {
      ProductModel.findOne({ where: { name }, attributes: { exclude: ["categoryId"] }, include: [CategoryModel] })
        .then((product) => resolve(product as unknown as ProductEntity))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - findByName", error);
          resolve("error-find-product-by-name");
        });
    });
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity|string> {
    return new Promise((resolve) => {
      ProductModel.update(product, { where: { id: id } })
        .then((product) => resolve(product as unknown as ProductEntity))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - update", error);
          resolve("error-update-product");
        });
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      ProductModel.destroy({ where: { id } })
        .then(() => resolve("Produto deletado com sucesso"))
        .catch((error) => {
          console.error("[ERROR] ProductRepository - delete", error);
          resolve("error-delete-product");
        });
    });
  }
}
