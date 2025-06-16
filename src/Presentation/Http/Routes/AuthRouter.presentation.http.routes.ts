import { Elysia, t } from "elysia";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { AuthController } from "../Controllers/AuthController.presentation.controllers";

const router = new Elysia();
const controller = new AuthController();

router
  .post("/auth/login",
    (ctx) => controller.login(ctx as unknown as IJwtContext),
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      tags: ["Autenticação"],
      detail: {
        summary: "Login de usuário",
        description: "Login de usuário com email e senha para acessar o sistema",
      },
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            token: t.String()
          })
        }),
        400: t.Object({
          message: t.String(),
        }),
        401: t.Object({
          message: t.String(),
        }),
      }
    }
  );

export {
  router as AuthRouter
};
