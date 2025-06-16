import "reflect-metadata";
import { Elysia, Context } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt"
import { ApiKeyMiddleware } from "./Middlewares/ApiKeyMiddleware.prensetation.http.middlewares";
import { ConnecDatabase } from "../../Infrastructure/Database/Config/ConnectDB.infrastructre.database.config";
import { cookie } from "@elysiajs/cookie";

import { ClientRouter } from "./Routes/ClientRouter.presentation.http.routes";
import { CategoryRouter } from "./Routes/CategoryRouter.presentation.http.routes";
import { UserRouter } from "./Routes/UserRouter.presentation.http.routes";
import { AuthRouter } from "./Routes/AuthRouter.presentation.http.routes";
import { ProductRouter } from "./Routes/ProductRouter.presentation.http.routes";

const App = new Elysia();

App.use(cors({ origin: true }));
App.onBeforeHandle((ctx) => ApiKeyMiddleware(ctx as Context));

App.use(jwt({
  name: "security",
  secret: String(process.env.APPLICATION_SECRET_KEY),
  exp: "4h",
  alg: "HS256"
}));

App.use(cookie());

App.use(
  swagger({
    documentation: {
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "Desafio Técnico XPE - Pós Arquitetura de Software",
      },
      tags: [
        {
          name: "Servidor",
          description: "Gerenciamento de servidor",
        },
        {
          name: "Autenticação",
          description: "Gerenciamento de autenticação de usuários",
        },
        {
          name: "Clientes",
          description: "Gerenciamento de clientes",
        },
        {
          name: "Produtos",
          description: "Gerenciamento de produtos",
        },
        {
          name: "Pedidos",
          description: "Gerenciamento de pedidos",
        },
        {
          name: "Categorias",
          description: "Gerenciamento de categorias",
        }
      ],
    },
  })
);

App.group("", (app) => 
  app
  .use(ClientRouter)  
  .use(CategoryRouter)
  .use(UserRouter)
  .use(AuthRouter)
  .use(ProductRouter)
);

App.onStart(async () => {
  await ConnecDatabase();
});

export default App;
