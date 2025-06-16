import { container } from "tsyringe";
import { UserService } from "../../../Application/Services/UserService.application.services";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { UserEntity } from "../../../Domain/Entities/UserEntity.domain.entities";

import "../../../Shared/Containers/Controllers/UserContainer.shared.containers.controllers";

export class UserController {
  private readonly service = container.resolve(UserService);

  async create({ body, set }: IJwtContext) {
    const { name, email, password } = body as UserEntity;

    const responseService = await this.service.create({ name, email, password } as UserEntity);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }

  async findByEmail({ body, set }: IJwtContext) {
    const { email } = body as UserEntity;

    const responseService = await this.service.findByEmail(email);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }
}