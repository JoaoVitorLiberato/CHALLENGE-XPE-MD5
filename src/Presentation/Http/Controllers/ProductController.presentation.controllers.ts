import { container } from "tsyringe";
import { ProductService } from "../../../Application/Services/ProductService.application.services";
import { ProductEntity } from "../../../Domain/Entities/ProductEntity.domain.entities";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";

// dependencies
import "../../../Shared/Containers/Controllers/ProductContainer.shared.containers.controllers";

export class ProductController {
  private readonly service = container.resolve(ProductService);

  async create({ body, set }: IJwtContext) {
    const responseService = await this.service.create(body as ProductEntity);
    
    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    }
  }

  async findAll({ set }: IJwtContext) {
    const responseService = await this.service.findAll();

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    }
  }

  async count({ set }: IJwtContext) {
    const responseService = await this.service.count();

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    }
  }

  async findById({ params, set }: IJwtContext) {
    const responseService = await this.service.findById(params.id);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    }
  }

  async findByName({ body, set }: IJwtContext) {
    const responseService = await this.service.findByName((body as { name: string }).name);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    }
  }

  async update({ params, body, set }: IJwtContext) {
    const responseService = await this.service.update(params.id, body as ProductEntity);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
    }
  }

  async delete({ params, set }: IJwtContext) {
    const responseService = await this.service.delete(params.id);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
    }
  }
}
