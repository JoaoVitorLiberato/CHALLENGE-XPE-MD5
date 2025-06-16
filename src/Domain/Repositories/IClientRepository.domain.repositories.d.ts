import { ClientEntity } from "../Entities/ClientEntity.domain.entities";

export interface IClientRepository {
  create(data: ClientEntity): Promise<ClientEntity|string>;
  count(): Promise<number|string>;
  findAll(): Promise<ClientEntity[]|string>;
  findByName(name: string): Promise<ClientEntity|string>;
  findById(id: string): Promise<ClientEntity | string>;
  update(id: string, data: ClientEntity): Promise<ClientEntity | string>;
  delete(id: string): Promise<string>;
}