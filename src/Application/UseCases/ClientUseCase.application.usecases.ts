import { injectable, inject } from "tsyringe";
import { ClientEntity } from "../../Domain/Entities/ClientEntity.domain.entities";
import { ClientFactory } from "../../Domain/Factory/ClientFactory.domain.factory";
import { IClientRepository } from "../../Domain/Repositories/IClientRepository.domain.repositories";

interface ClientRepository extends IClientRepository {}

@injectable()
export class ClientUseCase {
  constructor(
    @inject("IClientRepository")
      private readonly repository: ClientRepository
  ) {}

  async create(data: ClientEntity): Promise<ClientEntity|string> {
    const dto = ClientFactory.save(data);
    return this.repository.create(dto);
  }

  async count(): Promise<number|string> {
    return this.repository.count();
  }

  async findByName(name: string): Promise<ClientEntity|string> {
    return this.repository.findByName(name);
  }

  async findById(id: string): Promise<ClientEntity|string> {
    return this.repository.findById(id);
  }

  async update(id: string, data: ClientEntity): Promise<ClientEntity|string> {
    const dto = ClientFactory.save(data);
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<string> {
    return this.repository.delete(id);
  }
}
