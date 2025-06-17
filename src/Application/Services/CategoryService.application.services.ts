import { injectable } from "tsyringe";
import { CategoryUseCase } from "../UseCases/CategoryUseCase.application.usecases";
import { CategoryEntity } from "../../Domain/Entities/CategoryEntity.domain.entities";
import { ICategoryContract } from "../Contracts/ICategoryContract.application.contracts";

@injectable()
export class CategoryService implements ICategoryContract {
  constructor(
    private readonly category: CategoryUseCase,
  ) {}

  async create (data: CategoryEntity): Promise<any> {
    try {
      const responseRepository = await this.category.create(data);

      if (responseRepository === "error-create-category") throw new Error("Houve um erro ao tentar criar a categoria");

      return {
        codigo: 200,
        message: "Categoria criada com sucesso",
        data: {
          id: (responseRepository as { id: string }).id,
        },
      }
    } catch (error) {
      console.error("ERROR CategoryService - create", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar criar a categoria",
      }
    }
  }

  async findAll(): Promise<any> {
    try {
      const responseRepository = await this.category.findAll();
      if (responseRepository === "error-findAll-category") throw new Error("Houve um erro ao tentar buscar as categorias");

      if (responseRepository.length === 0) {
        return {
          codigo: 200,
          message: "Nenhuma categoria encontrada",
          data: [],
        }
      }

      return {
        codigo: 200,
        message: "Categorias encontradas com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR CategoryService - findAll", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar as categorias",
      }
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const responseRepository = await this.category.findById(id);

      if (responseRepository === "error-findById-category") throw new Error("Houve um erro ao tentar buscar a categoria");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Categoria não encontrada",
        }
      }

      return {
        codigo: 200,
        message: "Categoria encontrada com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR CategoryService - findById", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar a categoria",
      }
    }
  }

  async findByName(name: string): Promise<any> {
    try {
      const responseRepository = await this.category.findByName(name);

      if (responseRepository === "error-findByName-category") throw new Error("Houve um erro ao tentar buscar a categoria");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Categoria não encontrada",
        }
      }

      return {
        codigo: 200,
        message: "Categoria encontrada com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR CategoryService - findByName", error);
      return {
        codigo: 400,
        mensage: "Houve um erro ao tentar buscar a categoria",
      }
    }
  }

  async update(id: string, data: CategoryEntity): Promise<any> {
    try {
      const responseFindById = await this.category.findById(id);

      if (responseFindById === "error-findById-category") throw new Error("Houve um erro ao tentar buscar a categoria");
      if (!responseFindById) {
        return {
          codigo: 404,
          message: "Categoria não encontrada",
        }
      }

      const responseRepository = await this.category.update(id, data);

      if (responseRepository === "error-update-category") throw new Error("Houve um erro ao tentar atualizar a categoria");

      return {
        codigo: 200,
        message: "Categoria atualizada com sucesso",
        data: {
          id: id,
        },
      }
    } catch (error) {
      console.error("ERROR CategoryService - update", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar atualizar a categoria",
      }
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseFindById = await this.category.findById(id);

      if (responseFindById === "error-findById-category") throw new Error("Houve um erro ao tentar buscar a categoria");
      if (!responseFindById) {
        return {
          codigo: 404,
          message: "Categoria não encontrada",
        }
      }

      const responseRepository = await this.category.delete(id);

      if (responseRepository === "error-delete-category") throw new Error("Houve um erro ao tentar deletar a categoria");

      return {
        codigo: 200,
        message: "Categoria deletada com sucesso",
        data: {
          id: id,
        },
      }
    } catch (error) {
      console.error("ERROR CategoryService - delete", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar deletar a categoria",
      }
    }
  }
}
