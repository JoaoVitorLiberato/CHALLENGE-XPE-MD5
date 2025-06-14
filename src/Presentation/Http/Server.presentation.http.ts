import App from "./App.presentation.http";

App.get("/", () => "<h1>API is running</h1>");

App.listen(Number(process.env.APPLICATION_API_PORT), () => {
  console.log(`🦊 Server is running at ${App.server?.port}`);
});
