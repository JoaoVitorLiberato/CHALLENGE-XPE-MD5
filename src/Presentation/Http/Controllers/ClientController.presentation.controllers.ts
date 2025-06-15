import { Context } from "elysia";
import { container } from "tsyringe";
import { ClientService } from "../../../Application/Services/ClientService.application.services";
import { ClientEntity } from "../../../Domain/Entities/ClientEntity.domain.entities";

// dependencias
import "../../../Shared/Containers/Controllers/ClientContainer.shared.containers.controllers"

export class ClientController {
  private readonly _service = container.resolve(ClientService);

  async create ({ body, set }: Context) {
    const responseService = await this._service.create(body as ClientEntity);
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async count ({ set }: Context) {
    const responseService = await this._service.count();
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async findByName ({ body, set }: Context) {
    const responseService = await this._service.findByName((body as { name: string }).name);
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async findById ({ params, set }: Context) {
    const responseService = await this._service.findById(params.id);
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async update ({ params, body, set }: Context) {
    const responseService = await this._service.update(params.id, body as ClientEntity);
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async delete ({ params, set }: Context) {
    const responseService = await this._service.delete(params.id);
    set.status = responseService.codigo;

    return {
      message: responseService.message,
    };
  }
}
