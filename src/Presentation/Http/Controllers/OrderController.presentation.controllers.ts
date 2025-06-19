import { container } from "tsyringe";
import { OrderEntity } from "../../../Domain/Entities/OrderEntity.domain.entities";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { OrderService } from "../../../Application/Services/OrderService.application.services";

// dependencies
import "../../../Shared/Containers/Controllers/OrderContainer.shared.containers.controllers";

export class OrderController {
  service = container.resolve(OrderService);

  async create ({ body, set }: IJwtContext): Promise<any> {
    const responseService = await this.service.create(body as OrderEntity);

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
      data: responseService.data
    };
  }

  async findAll({ set }: IJwtContext): Promise<any> {
    const responseService = await this.service.findAll();

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
      data: responseService.data
    };
  }

  async findById({ params, set }: IJwtContext): Promise<any> {
    const responseService = await this.service.findById(params.id as string);

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
      data: responseService.data
    };
  }

  async update({ params, body, set }: IJwtContext): Promise<any> {
    const responseService = await this.service.update(params.id as string, (body as { status: string }).status);

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
      data: responseService.data
    };
  }

  async delete({ params, set }: IJwtContext): Promise<any> {
    const responseService = await this.service.delete(params.id as string);

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
    };
  }

  async count({ set }: IJwtContext): Promise<any> {
    const responseService = await this.service.count();

    set.status = responseService.codigo;

    return {
      message: responseService.mensagem,
      data: responseService.data
    };
  }
}
