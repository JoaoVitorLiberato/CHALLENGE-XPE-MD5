import { JwtContext } from "../Types/JwtContextType.presentation.http";
import { Context } from "elysia";

export class JwtMiddleware {
  static async validate ({ request, set, security }: any) {
    const TOKEN = request.headers.get("Authorization")?.split(" ")[1];

    if (!TOKEN) {
      set.status = 401;
      return {
        message: "Usuário não autorizado",
      };
    }

    const VALIDATE = await security.verify(TOKEN);

    if (!VALIDATE) {
      set.status = 401;
      return {
        message: "Token inválido",
      };
    }

    return VALIDATE;
  }
}
