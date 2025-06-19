import { Elysia, t } from "elysia";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";
import { OrderController } from "../Controllers/OrderController.presentation.controllers";

const router = new Elysia();
const controller = new OrderController();

const clients: Set<WebSocket> = new Set();

router
  .ws("/ws/order", {
    open(ws: any) {
      const { token: HASH } = ws.data.query;

      if (!String(HASH)) {
        ws.close(1008, "Unauthorized");
        return;
      }

      clients.add(ws);
      ws.send(`🧩 Conectado ao canal de pedidos.`);
    },

    message(ws: any ) {
      ws.send("🧩 Pedido Recebido com sucesso");
    },

    close(ws: any) {
      clients.delete(ws);
    },
  })
  .post("/order/create",
    (ctx) => controller.create(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Criar pedido",
        description: "Cria um novo pedido no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      body: t.Object({
        clientId: t.String(),
        status: t.String(),
        total: t.Number(),     
        items: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
          quantity: t.Number(),
          price: t.Number(),
        })),
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
      },
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as unknown as IJwtContext))
  .get("/orders",
    (ctx) => controller.findAll(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Buscar todos os pedidos",
        description: "Busca todos os pedidos no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Array(t.Object({
            id: t.String(),
            status: t.String(),
            total: t.String(),
            items: t.Array(t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Number(),
              quantity: t.Number(),
            })),
            createdAt: t.Date(),
            updatedAt: t.Date(),
            client: t.Object({
              id: t.String(),
              name: t.String(),
            }),
          })),
        }),
        400: t.Object({
          message: t.String(),
        }),
      },
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as unknown as IJwtContext))
  .get("/order/:id",
    (ctx) => controller.findById(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Buscar pedido por ID",
        description: "Busca um pedido no banco de dados pelo ID",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            id: t.String(),
            status: t.String(),
            total: t.String(),
            items: t.Array(t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Number(),
              quantity: t.Number(),
            })),
            createdAt: t.Date(),
            updatedAt: t.Date(),
            client: t.Object({
              id: t.String(),
              name: t.String(),
            }),
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        }),
      },
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as unknown as IJwtContext))
  .put("/order/update/:id",
    (ctx) => controller.update(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Atualizar pedido por ID",
        description: "Atualiza um pedido no banco de dados pelo ID",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        status: t.String(),
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
      },
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as unknown as IJwtContext))
  .delete("/order/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Deletar pedido por ID",
        description: "Deleta um pedido no banco de dados pelo ID",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      params: t.Object({
        id: t.String(),
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
      },
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as unknown as IJwtContext))
  .get("/order/count",
    (ctx) => controller.count(ctx as unknown as IJwtContext),
    {
      tags: ["Pedidos"],
      detail: {
        summary: "Contar pedidos",
        description: "Conta todos os pedidos no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            quantity: t.Number(),
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
      },
    }
  );

export {
  router as OrderRouter,
  clients as clientsWebSocket
};