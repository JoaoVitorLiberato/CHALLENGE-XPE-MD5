import { injectable } from "tsyringe";
import { ClientUseCase } from "../UseCases/ClientUseCase.application.usecases";
import { ClientEntity } from "../../Domain/Entities/ClientEntity.domain.entities";

@injectable()
export class ClientService {
  constructor(
    private readonly client: ClientUseCase
  ) {}

  async create (data: ClientEntity): Promise<any> {
    try {
      const responseRepository = await this.client.create(data);

      if (responseRepository === "error-create-client") throw new Error("Houve um erro ao tentar criar o cliente");

      if (responseRepository === "email-already-exists") {
        return {
          codigo: 400,
          message: "Email já está em uso",
        }
      }

      return {
        codigo: 200,
        message: "Cliente criado com sucesso",
        data: {
          id: (responseRepository as { id: string }).id,
        },
      }
    } catch (error) {
      console.error("ERROR ClientService - create", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar criar o cliente",
      }
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const responseRepository = await this.client.findById(id);

      if (responseRepository === "error-find-client") throw new Error("Houve um erro ao tentar buscar o cliente");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Cliente não encontrado",
        }
      }

      return {
        codigo: 200,
        message: "Cliente encontrado com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR ClientService - findById", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar o cliente",
      }
    }
  }

  async findAll(): Promise<any> {
    try {
      const responseRepository = await this.client.findAll();

      if (responseRepository === "error-find-all-client") throw new Error("Houve um erro ao tentar buscar os clientes");
      if ((responseRepository as ClientEntity[]).length === 0) {
        return {
          codigo: 404,
          message: "Nenhum cliente encontrado",
        }
      }

      console.log(responseRepository)
      return {
        codigo: 200,
        message: "Clientes encontrados com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR ClientService - findAll", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar os clientes",
      }
    }
  }

  async count(): Promise<any> {
    try {
      const responseRepository = await this.client.count();

      if (responseRepository === "error-count-client") throw new Error("Houve um erro ao tentar buscar o cliente");
      if (responseRepository === 0) {
        return {
          codigo: 404,
          message: "Nenhum cliente encontrado",
          data: {
            quantity: 0,
          },  
        }
      }

      return {
        codigo: 200,
        message: "Clientes encontrados com sucesso",
        data: {
          quantity: responseRepository,
        },
      }
    } catch (error) {
      console.error("ERROR ClientService - count", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar os clientes para contagem",
      }
    }
  }

  async findByName(name: string): Promise<any> {
    try {
      const responseRepository = await this.client.findByName(name);

      if (responseRepository === "error-find-client") throw new Error("Houve um erro ao tentar buscar o cliente");

      if (!responseRepository) {
        return {
          codigo: 404,
          message: "Cliente não encontrado",
        }
      }

      return {
        codigo: 200,
        message: "Cliente encontrado com sucesso",
        data: responseRepository,
      }
    } catch (error) {
      console.error("ERROR ClientService - findByName", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar buscar o cliente pelo nome",
      }
    }
  }

  async update(id: string, data: ClientEntity): Promise<any> {
    try {
      const responseRepositoryFindById = await this.client.findById(id);

      if (responseRepositoryFindById === "error-find-client") throw new Error("Houve um erro ao tentar buscar o cliente");

      if (!responseRepositoryFindById) {
        return {
          codigo: 404,
          message: "Cliente não encontrado",
        }
      }

      const responseRepository = await this.client.update(id, { ...data });

      if (responseRepository === "error-update-client") throw new Error("Houve um erro ao tentar atualizar o cliente");

      if (responseRepository === "email-already-exists") {
        return {
          codigo: 400,
          message: "Email já está em uso",
        }
      }

      return {
        codigo: 200,
        message: "Cliente atualizado com sucesso",
        data: { id },
      }
    } catch (error) {
      console.error("ERROR ClientService - update", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar atualizar o cliente",
      }
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseRepositoryFindById = await this.client.findById(id);

      if (responseRepositoryFindById === "error-find-client") throw new Error("Houve um erro ao tentar buscar o cliente");

      if (!responseRepositoryFindById) {
        return {
          codigo: 404,
          message: "Cliente não encontrado",
        }
      }

      const responseRepository = await this.client.delete(id);

      if (responseRepository === "error-delete-client") throw new Error("Houve um erro ao tentar deletar o cliente");

      return {
        codigo: 200,
        message: "Usuário deletado com sucesso",
      }
    } catch (error) {
      console.error("ERROR ClientService - delete", error);
      return {
        codigo: 400,
        message: "Houve um erro ao tentar deletar o cliente",
      }
    }
  }
}
