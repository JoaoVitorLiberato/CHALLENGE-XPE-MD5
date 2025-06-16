import { Elysia, t } from "elysia";
import { UserController } from "../Controllers/UserController.presentation.controllers";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";

const router = new Elysia();
const controller = new UserController();

router.post("/user/create",
  (ctx) => controller.create(ctx as unknown as IJwtContext),
  {
    tags: ["Usuários"],
    detail: {
      summary: "Criar usuário",
      description: "Cria um novo usuário no banco de dados",
    },
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
    headers: t.Object({
      "x-api-key": t.String(),
    }),
    response: {
      200: t.Object({
        message: t.String(),
        data: t.Object({
          id: t.String(),
        }),
      }),
      400: t.Object({
        message: t.String(),
      }),
    }
  }
);

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as IJwtContext))
  .post("/user/me",
    (ctx) => controller.findByEmail(ctx as unknown as IJwtContext),
    {
      tags: ["Usuários"],
      detail: {
        summary: "Buscar usuário pelo email",
        description: "Buscar detalhes do usuário pelo email no banco de dados",
      },
      body: t.Object({
        email: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            id: t.String(),
            name: t.String(),
            email: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
      }
    }
);

export {
  router as UserRouter,
};