import { injectable } from "tsyringe";
import { ICategoryRepository } from "../../Domain/Repositories/ICategoryRepository.domain.repositories";
import { CategoryModel } from "../Database/Models/CategoryModel.infrastructure.database.models";
import { CategoryEntity } from "../../Domain/Entities/CategoryEntity.domain.entities";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<CategoryEntity[]|string> {
    return new Promise((resolve) => {
      CategoryModel.findAll()
        .then((categories) => resolve(categories as unknown as CategoryEntity[]))
        .catch((error) => {
          console.error("ERROR CategoryRepository - findAll", error);
          resolve("error-findAll-category");
        });
    });
  }

  async findById(id: string): Promise<CategoryEntity|string> {
    return new Promise((resolve) => {
      CategoryModel.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      })
        .then((category) => resolve(category as unknown as CategoryEntity))
        .catch((error) => {
          console.error("ERROR CategoryRepository - findById", error);
          resolve("error-findById-category");
        });
    });
  }

  async findByName(name: string): Promise<CategoryEntity|string> {
    return new Promise((resolve) => {
      CategoryModel.findOne({ where: { name } })
        .then((category) => resolve(category as unknown as CategoryEntity))
        .catch((error) => {
          console.error("ERROR CategoryRepository - findByName", error);
          resolve("error-findByName-category");
        });
    });
  } 

  async create(data: CategoryEntity): Promise<CategoryEntity|string> {
    return new Promise((resolve) => {
      CategoryModel.create({ ...data })
        .then((category) => resolve(category as unknown as CategoryEntity))
        .catch((error) => {
          console.error("ERROR CategoryRepository - create", error);
          resolve("error-create-category");
        });
    });
  }

  async update(id: string, data: CategoryEntity): Promise<CategoryEntity|string> {
    return new Promise((resolve) => {
      CategoryModel.update(data, { where: { id } })
        .then(() => resolve(data as unknown as CategoryEntity))
        .catch((error) => {
          console.error("ERROR CategoryRepository - update", error);
          resolve("error-update-category");
        });
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      CategoryModel.destroy({ where: { id } })
        .then(() => resolve("Category deleted successfully"))
        .catch((error) => {
          console.error("ERROR CategoryRepository - delete", error);
          resolve("error-delete-category");
        });
    });
  }
}