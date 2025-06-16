import { inject, injectable } from "tsyringe";
import { ProductUseCase } from "../UseCases/ProductUseCase.application.usecases";
import { ProductEntity } from "../../Domain/Entities/ProductEntity.domain.entities";
import { ICategoryContract } from "../Contracts/ICategoryContract.applicaiton.contracts";

interface CategoryService extends ICategoryContract {}

@injectable()
export class ProductService {
  constructor(
    private readonly product: ProductUseCase,
    @inject("ICategoryContract") private readonly category: CategoryService
  ) {}

  async create(product: ProductEntity): Promise<any> {
    try {
      const responseSerivceCategory = await this.category.findById(product.categoryId);
      console.log(responseSerivceCategory);
      
      if (
        (responseSerivceCategory as any).codigo === 400 ||
        (responseSerivceCategory as any).codigo === 404
      ) {
        return {
          codigo: (responseSerivceCategory as any).codigo,
          message: (responseSerivceCategory as any).message,
        };
      }

      const responseRepository = await this.product.create(product);
      if (responseRepository === "error-create-product") throw new Error("Houve um erro ao criar o produto");

      return {
        codigo: 201,
        message: "Produto criado com sucesso",
        data: {
          id: (responseRepository as { id: string }).id,
        }
      }
    } catch (error) {
      console.error("[ERROR] ProductService - create", error);
      return {
        codigo: 400,
        message: "Houve um erro ao criar o produto",
      }
    }
  }

  async findAll(): Promise<any> {
    try {
      const responseRepository = await this.product.findAll();
      if (responseRepository === "error-find-all-products") throw new Error("Houve um erro ao buscar os produtos");

      if (responseRepository.length === 0) {
        return {
          codigo: 404,
          message: "Nenhum produto encontrado",
          data: [],
        };
      }

      return {
        codigo: 200,
        message: "Produtos encontrados com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] ProductService - findAll", error);
      return {
        codigo: 400,
        message: "Houve um erro ao buscar os produtos",
      }
    }
  }

  async count(): Promise<any> {
    try {
      const responseRepository = await this.product.count();
      if (responseRepository === "error-count-products") throw new Error("Houve um erro ao contar os produtos");

      return {
        codigo: 200,
        message: "Produtos contados com sucesso",
        data: {
          quantity: responseRepository,
        },
      };
    } catch (error) {
      console.error("[ERROR] ProductService - count", error);
      return {
        codigo: 400,
        message: "Houve um erro ao contar os produtos",
      }
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const responseRepository = await this.product.findById(id);
      if (responseRepository === "error-find-product-by-id") throw new Error("Houve um erro ao buscar o produto");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Produto não encontrado",
        }
      }

      return {
        codigo: 200,
        message: "Produto encontrado com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] ProductService - findById", error);
      return {
        codigo: 400,
        message: "Houve um erro ao buscar o produto",
      }
    }
  }

  async findByName(name: string): Promise<any> {
    try {
      const responseRepository = await this.product.findByName(name);
      if (responseRepository === "error-find-product-by-name") throw new Error("Houve um erro ao buscar o produto");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Produto não encontrado",
        }
      }

      return {
        codigo: 200,
        message: "Produto encontrado com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] ProductService - findByName", error);
      return {
        codigo: 400,
        message: "Houve um erro ao buscar o produto",
      }
    } 
  }

  async update(id: string, product: ProductEntity): Promise<any> {
    try {
      const responseRepositoryFindById = await this.product.findById(id);
      if (responseRepositoryFindById === "error-find-product-by-id") throw new Error("Houve um erro ao buscar o produto");
      if (!responseRepositoryFindById) {
        return {
          codigo: 404,
          message: "Produto não encontrado",
        }
      }

      const responseRepositoryUpdate = await this.product.update(id, product);
      if (responseRepositoryUpdate === "error-update-product") throw new Error("Houve um erro ao atualizar o produto");

      return {
        codigo: 200,
        message: "Produto atualizado com sucesso",
      };
    } catch (error) {
      console.error("[ERROR] ProductService - update", error);
      return {
        codigo: 400,
        message: "Houve um erro ao atualizar o produto",
      }
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseRepositoryFindById = await this.product.findById(id);
      if (responseRepositoryFindById === "error-find-product-by-id") throw new Error("Houve um erro ao buscar o produto");
      if (!responseRepositoryFindById) {
        return {
          codigo: 404,
          message: "Produto não encontrado",
        }
      }

      const responseRepositoryDelete = await this.product.delete(id);
      if (responseRepositoryDelete === "error-delete-product") throw new Error("Houve um erro ao deletar o produto");

      return {
        codigo: 200,
        message: "Produto deletado com sucesso",
      };
    } catch (error) {
      console.error("[ERROR] ProductService - delete", error);
      return {
        codigo: 400,
        message: "Houve um erro ao deletar o produto",
      }
    }
  }
}