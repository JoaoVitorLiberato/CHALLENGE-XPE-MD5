import "reflect-metadata";
import { Elysia, Context } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt"
import { ApiKeyMiddleware } from "./Middlewares/ApiKeyMiddleware.prensetation.http.middlewares";
import { UsuariosRouter } from "./Routes/UsuariosRouter.presentation.http.routes";

const App = new Elysia();

App.use(cors());
App.onBeforeHandle((ctx) => ApiKeyMiddleware(ctx as Context));

App.use(jwt({
  name: "security",
  secret: String(process.env.APPLICATION_SECRET_KEY),
  exp: "1d",
  alg: "HS256"
}));

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
          name: "Usuários",
          description: "Gerenciamento de usuários",
        },
        {
          name: "Produtos",
          description: "Gerenciamento de produtos",
        },
        {
          name: "Pedidos",
          description: "Gerenciamento de pedidos",
        },
      ],
    },
  })
);

App.group("", (app) => 
  app
  .use(UsuariosRouter)
);

export default App;
