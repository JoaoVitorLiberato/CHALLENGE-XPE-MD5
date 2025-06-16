import { container } from "tsyringe";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { AuthService } from "../../../Application/Services/AuthService.application.services";


import "../../../Shared/Containers/Controllers/AuthContainer.shared.containers.controllers";

export class AuthController {
  private readonly service = container.resolve(AuthService);

  async login({ body, set, security }: IJwtContext) {
    const { email, password } = body as { email: string, password: string };

    const responseService = await this.service.login(email, password, { security } as IJwtContext);

    set.status = responseService.codigo;

    return {
      message: responseService.message,
      data: responseService.data,
    };
  }
}