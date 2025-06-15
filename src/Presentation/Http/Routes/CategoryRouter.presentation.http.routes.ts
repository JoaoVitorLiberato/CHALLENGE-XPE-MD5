import { Context, Elysia, t } from "elysia";
import { CategoryController } from "../Controllers/CategoryController.presentation.controllers";

const router = new Elysia();
const controller = new CategoryController();

router
  .get("/categories",
    (ctx) => controller.findAll(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Buscar todas as categorias",
        description: "Busca todas as categorias existentes no banco de dados",
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
            description: t.String(),
          })),
        }),
        400: t.Object({
          message: t.String(),
        })
      }
    },
  );

router
  .post("/category/name",
    (ctx) => controller.findByName(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Buscar categoria por nome",
        description: "Busca uma categoria existente no banco de dados pelo nome",
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
            description: t.String(),
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        })
      }
    },
  );


router
  .get("/category/:id",
    (ctx) => controller.findById(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Buscar categoria por ID",
        description: "Busca uma categoria existente no banco de dados pelo ID",
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
          data: t.Object({
            name: t.String(),
            description: t.String(),
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        })
      }
    },
  );

router
  .post("/category/create",
    (ctx) => controller.create(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Criar categoria",
        description: "Cria uma nova categoria",
      },
      body: t.Object({
        name: t.String(),
        description: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            id: t.String()
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        })
      }
    },
  );

router
  .put("/category/update/:id",
    (ctx) => controller.update(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Atualizar categoria",
        description: "Atualiza uma categoria existente no banco de dados",
      },
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        description: t.String(),
      }),
      headers: t.Object({
        "x-api-key": t.String(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            id: t.String()
          }),
        }),
        400: t.Object({
          message: t.String(),
        }),
        404: t.Object({
          message: t.String(),
        })
      }
    },
  );
router
  .delete("/category/delete/:id",
    (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Categorias"],
      detail: {
        summary: "Deletar categoria",
        description: "Deleta uma categoria existente no banco de dados",
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
        })
      }
    },
  );

export {
  router as CategoryRouter
};
