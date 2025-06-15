import { container } from "tsyringe";
import { Context } from "elysia";
import { CategoryService } from "../../../Application/Services/CategoryService.application.services";
import { CategoryEntity } from "../../../Domain/Entities/CategoryEntity.domain.entities";

// dependencias
import "../../../Shared/Containers/Controllers/CategoryContainer.shared.containers.controllers";

export class CategoryController {
  private readonly _service = container.resolve(CategoryService);

   async create({ body, set }: Context) {
    const dto = body as CategoryEntity;
    const responseService = await this._service.create(dto);
    set.status = responseService.codigo;

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }

  async findAll({ set }: Context) {
    const responseService = await this._service.findAll();
    set.status = responseService.codigo;

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }

  async findByName({ set, body }: Context) {
    const { name } = body as CategoryEntity;

    const responseService = await this._service.findByName(name);
    set.status = responseService.codigo;
    console.log(responseService);

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }

  async findById({ params, set }: Context) {
    const responseService = await this._service.findById(params.id);
    set.status = responseService.codigo;

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }

  async update({ params, body, set }: Context) {
    const dto = body as CategoryEntity;
    const responseService = await this._service.update(params.id, dto);
    set.status = responseService.codigo;

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }

  async delete({ params, set }: Context) {
    const responseService = await this._service.delete(params.id);
    set.status = responseService.codigo;

    return {
      message: responseService.mensage,
      data: responseService.data,
    };
  }
}
