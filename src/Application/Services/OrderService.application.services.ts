import { injectable, inject } from "tsyringe";
import { RedisPublish } from "../../Infrastructure/Redis/RedisPublish.infrastucture.redis";
import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";
import { OrderUseCase } from "../UseCases/OrderUseCase.application.usecase";
import { IProductContract } from "../Contracts/IProductContract.application.contracts";

interface ProductContract extends IProductContract {}

@injectable()
export class OrderService {
  constructor(
    private readonly order: OrderUseCase,
    private readonly client: RedisPublish,
    @inject("IProductContract") private readonly product: ProductContract
  ) {}

  async create(order: OrderEntity): Promise<any> {
    try {
      const VALIDATE_PRODUCTS = order.items.map(async (item) => {
        const PRODUCT = await this.product.findById(item.id);
        if ((PRODUCT as any).codigo === 404) return true;
        if (!PRODUCT) return true;
        return false;
      });

      const responseValidateProducts = await Promise.all(VALIDATE_PRODUCTS);
      if (responseValidateProducts.some((item) => item)) throw new Error("Produto não encontrado");

      const responseRepository = await this.order.create(order);
      if (String(responseRepository) === "error-create-order")
        throw new Error("Houve um erro ao criar o pedido");

      await this.client.publish(responseRepository as OrderEntity);

      return {
        codigo: 201,
        mensagem: "Pedido criado com sucesso",
        data: {
          id: (responseRepository as OrderEntity).id
        },
      };
    } catch (error) {
      console.error("[ERROR] OrderService - create", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao criar o pedido"
      };
    }
  }

  async findAll(): Promise<any> {
    try {
      const responseRepository = await this.order.findAll();
      if (String(responseRepository) === "error-find-all-orders")
        throw new Error("Houve um erro ao buscar os pedidos");

      return {
        codigo: 200,
        mensagem: "Pedidos buscados com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] OrderService - findAll", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao buscar os pedidos",
      };
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const responseRepository = await this.order.findById(id);
      if (String(responseRepository) === "error-find-order-by-id")
        throw new Error("Houve um erro ao buscar o pedido");

      if (!responseRepository) {
        return {
          codigo: 404,
          mensagem: "Pedido não encontrado",
        };
      }

      return {
        codigo: 200,
        mensagem: "Pedido encontrado com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] OrderService - findById", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao buscar o pedido",
      };
    }
  }

  async update(id: string, status: string): Promise<any> {
    try {
      const responseServiceFindById = await this.findById(id);

      if ((responseServiceFindById as any).codigo !== 200)
        return responseServiceFindById;

      const responseRepository = await this.order.update(id, status);
      if (String(responseRepository) === "error-update-order")
        throw new Error("Houve um erro ao atualizar o pedido");

      return {
        codigo: 200,
        mensagem: "Pedido atualizado com sucesso",
        data: responseRepository,
      };
    } catch (error) {
      console.error("[ERROR] OrderService - update", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao atualizar o pedido",
      };
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseServiceFindById = await this.findById(id);
      if ((responseServiceFindById as any).codigo !== 200)
        return responseServiceFindById;

      const responseRepository = await this.order.delete(id);
      if (String(responseRepository) === "error-delete-order")
        throw new Error("Houve um erro ao deletar o pedido");

      return {
        codigo: 200,
        mensagem: "Pedido deletado com sucesso",
      };
    } catch (error) {
      console.error("[ERROR] OrderService - delete", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao deletar o pedido",
      };
    }
  }

  async count(): Promise<any> {
    try {
      const responseRepository = await this.order.count();
      if (String(responseRepository) === "error-count-orders")
        throw new Error("Houve um erro ao contar os pedidos");

      return {
        codigo: 200,
        mensagem: "Pedidos contados com sucesso",
        data: {
          quantity: responseRepository,
        },
      };
    } catch (error) {
      console.error("[ERROR] OrderService - count", error);
      return {
        codigo: 400,
        mensagem: "Houve um erro ao contar os pedidos",
      };
    }
  }
}
