import { Elysia, Context, t } from "elysia";
import { ClientController } from "../Controllers/ClientController.presentation.controllers";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";
import { JwtContext } from "../Types/JwtContextType.presentation.http";

const router = new Elysia();
const controller = new ClientController();

router
  .post("/client/create",
    (ctx) => controller.create(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Criar cliente",
        description: "Cria um novo cliente no banco de dados",
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
  .get("/clients",
    (ctx) => controller.count(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Buscar clientes e conta-los",
        description: "Busca todos os clientes no banco de dados e conta-os",
      },
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            count: t.Number(),
            rows: t.Array(t.Object({
              id: t.String(),
              name: t.String()
            }))
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
      }
    }
  )

router
  .post("/client/name",
    (ctx) => controller.findByName(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Buscar cliente por nome",
        description: "Busca um cliente no banco de dados pelo nome",
      },
      body: t.Object({
        name: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
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
        404: t.Object({
          message: t.String(),
        }),
      }
    }
  );

router
  .get("/client/:id",
    (ctx) => controller.findById(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Buscar cliente por ID",
        description: "Busca um cliente no banco de dados pelo ID",
      },
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            id: t.String(),
            name: t.String(),
            email: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date()
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        }),
      }
    }
  );

router
  .put("/client/update/:id",
    (ctx) => controller.update(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Atualizar cliente",
        description: "Atualiza um cliente no banco de dados pelo ID",
      },
      params: t.Object({
        id: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
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
        404: t.Object({
          message: t.String(),
        }),
      }
    }
  );

router
  .delete("/client/delete/:id",
    (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Clientes"],
      detail: {
        summary: "Deletar cliente",
        description: "Deleta um cliente no banco de dados pelo ID",
      },
      params: t.Object({
        id: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        }),
      }
    }
  );

export {
  router as ClientRouter
};
