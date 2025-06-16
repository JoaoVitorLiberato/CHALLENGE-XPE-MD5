import { injectable } from "tsyringe";
import { ClientModel } from "../Database/Models/ClientModel.infrastructure.database.models";
import { ClientEntity } from "../../Domain/Entities/ClientEntity.domain.entities";
import { IClientRepository } from "../../Domain/Repositories/IClientRepository.domain.repositories";

@injectable()
export class ClientRepository implements IClientRepository {
  async create (client: ClientEntity): Promise<ClientEntity|string> {
    return new Promise((resolve) => {
      ClientModel.create({ ...client })
        .then((client) => resolve(client as unknown as ClientEntity))
        .catch((error) => {
          console.error("ERROR ClientRepository - create", error);

          if (String(error.errors[0].message) === "email must be unique") {
            resolve("email-already-exists");
          }

          resolve("error-create-client");
        });
    });
  }

  async count(): Promise<number|string> {
    return new Promise((resolve) => {
      ClientModel.count()
        .then((count) => resolve(count as unknown as any))
        .catch((error) => {
          console.error("ERROR ClientRepository - count", error);
          resolve("error-count-client");
        });
    });
  }

  async findAll(): Promise<ClientEntity[]|string> {
    return new Promise((resolve) => {
      ClientModel.findAll()
        .then((clients) => resolve(clients as unknown as ClientEntity[]))
        .catch((error) => {
          console.error("ERROR ClientRepository - findAll", error);
          resolve("error-find-all-client");
        });
    });
  }

  async findByName(name: string): Promise<ClientEntity|string> {
    return new Promise((resolve) => {
      ClientModel.findOne({ where: { name }, attributes: { exclude: ["password"] } })
        .then((client) => resolve(client as unknown as ClientEntity))
        .catch((error) => {
          console.error("ERROR ClientRepository - findByName", error);
          resolve("error-find-client");
        });
    });
  }

  async findById(id: string): Promise<ClientEntity|string> {
    return new Promise((resolve) => {
      ClientModel.findByPk(id)
        .then((client) => resolve(client as unknown as ClientEntity))
        .catch((error) => {
          console.error("ERROR ClientRepository - findById", error);
          resolve("error-find-client");
        });
    });
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity|string> {
    return new Promise((resolve) => {
      ClientModel.update({ ...client }, { where: { id }, returning: true })
        .then((client) => resolve(client as unknown as ClientEntity))
        .catch((error) => {
          console.error("ERROR ClientRepository - update", error);

          if (String(error.errors[0].message) === "email must be unique") {
            resolve("email-already-exists");
          }

          resolve("error-update-client");
        });
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      ClientModel.destroy({ where: { id } })
        .then(() => resolve("success-delete-client"))
        .catch((error) => {
          console.error("ERROR ClientRepository - delete", error);
          resolve("error-delete-client");
        });
    });
  }
}
