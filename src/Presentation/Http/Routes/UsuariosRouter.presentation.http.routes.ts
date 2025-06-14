import { Elysia } from "elysia";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";
import { JwtContext } from "../Types/JwtContextType.presentation.http";

const router = new Elysia();
const middleware = new JwtMiddleware();

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as JwtContext))
  .get("/teste", async (ctx) => "teste");

export {
  router as UsuariosRouter
};
