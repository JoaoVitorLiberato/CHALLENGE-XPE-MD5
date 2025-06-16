import { Elysia, t } from "elysia";
import { JwtMiddleware } from "../Middlewares/JwtMiddleware.presentation.http.middlewares";
import { IJwtContext } from "../Types/IJwtContextType.presentation.http.types";
import { ProductController } from "../Controllers/ProductController.presentation.controllers";

const router = new Elysia();
const controller = new ProductController();

router
  .get("/products",
    (ctx) => controller.findAll(ctx as unknown as IJwtContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Buscar todos os produtos",
        description: "Buscar todos os produtos cadastrados no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Number(),
            description: t.String(),
            image: t.String(),
            category: t.Object({
              id: t.String(),
              name: t.String(),
            }),
          })),
        }),
        400: t.Object({
          message: t.String(),
        }),
      }
    }
  );

router
  .get("/products/count",
    (ctx) => controller.count(ctx as unknown as IJwtContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Contar todos os produtos",
        description: "Contar todos os produtos cadastrados no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
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
      }
    }
  );

router
  .get("/product/:id",
    (ctx) => controller.findById(ctx as unknown as IJwtContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Procurar produto pelo id",
        description: "Procurar produto pelo id cadastrado no banco de dados",
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
            name: t.String(),
            price: t.Number(),
            description: t.String(),
            image: t.String(),
            category: t.Object({
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
      }
    }
  );

router
  .post("/product/name",
    (ctx) => controller.findByName(ctx as unknown as IJwtContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Procurar produto pelo nome",
        description: "Procurar produto pelo nome cadastrado no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      body: t.Object({
        name: t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            name: t.String(),
            price: t.Number(),
            description: t.String(),
            image: t.String(),
            category: t.Object({
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
      }
    }
  );

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as IJwtContext))
  .post("/product/create",
    (ctx) => controller.create(ctx as unknown as IJwtContext),
    {
      body: t.Object({
        name: t.String(),
        price: t.Number(),
        description: t.String(),
        categoryId: t.String(),
        image: t.String(),
      }),
      tags: ["Product"],
      detail: {
        summary: "Criar um novo produto",
        description: "Criar um novo produto com os dados informados no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
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
  .put("/product/update/:id",
    (ctx) => controller.update(ctx as unknown as IJwtContext),
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        price: t.Number(),
        description: t.String(),
        categoryId: t.String(),
        image: t.String(),
      }),
      tags: ["Product"],
      detail: {
        summary: "Atualizar um produto pelo id",
        description: "Atualizar um produto pelo id com os dados informados no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
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

router
  .onBeforeHandle((ctx) => JwtMiddleware.validate(ctx as IJwtContext))
  .delete("/product/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJwtContext),
    {
      params: t.Object({
        id: t.String(),
      }),
      tags: ["Product"],
      detail: {
        summary: "Deletar um produto pelo id",
        description: "Deletar um produto pelo id cadastrado no banco de dados",
      },
      headers: t.Object({
        "x-api-key": t.String(),
        "authorization": t.String(),
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
  router as ProductRouter
};
