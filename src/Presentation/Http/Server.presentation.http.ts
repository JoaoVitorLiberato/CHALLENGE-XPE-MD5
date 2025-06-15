import App from "./App.presentation.http";

App.get("/",
  () => ({
    message: "API is running",
  }), {
  tags: ["Servidor"],
  detail: {
    summary: "Verifica se a API está rodando",
    description: "Verifica se a API está rodando",
  },
});

App.listen(Number(process.env.APPLICATION_API_PORT), () => {
  console.log(`🦊 Server is running at ${App.server?.port}`);
});
