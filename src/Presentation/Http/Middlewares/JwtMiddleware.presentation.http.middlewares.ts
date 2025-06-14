import { JwtContext } from "../Types/JwtContextType.presentation.http";

export class JwtMiddleware {
  async validate ({ request, set, security }: JwtContext) {
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
