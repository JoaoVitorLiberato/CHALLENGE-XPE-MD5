import { Elysia, t } from "elysia";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { AuthController } from "../Controllers/AuthController.presentation.controllers";

const router = new Elysia();
const controller = new AuthController();

router
  .post("/auth/login",
    (ctx) => controller.login(ctx as IJwtContext)
  );

export {
  router as AuthRouter
};
