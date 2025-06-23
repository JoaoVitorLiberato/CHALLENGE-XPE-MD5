# Challenge XPE - Final Module

<p align="center">
  <img src="public/assets/img/XPE-DESAFIO-MD5.drawio.svg" alt="Diagrama XPE Desafio" width="100%"/>
</p>

## Configuração de Ambiente

Antes de rodar o projeto, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
APPLICATION_API_KEY=988bc3f55da3f849a4e95cc
APPLICATION_API_PORT=3000
APPLICATION_SECRET_KEY=988b4d9dba0c8d8cfc33992c71f55da3f849a46d1b203b47ce3c663ddb5e95cc
APPLICATION_REFRESH_SECRET_KEY=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
APPLICAITON_REDIS_CHANNEL="pedidos"
CONNECTION_DB_URL=postgresql://jo_o:svDJSKFjoMd5QMhU5GDrCw@droopy-mole-7113.jxf.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full
CONNECTION_DB_DIALECT=postgres
CONNECTION_DB_LOGGING=false
CONNECTION_DB_TIMEZONE=-03:00
CONNECTION_DB_USE_UTC=false
CONNECTION_DB_SSL_REQUIRE=true
CONNECTION_DB_SSL_REJECT_UNAUTHORIZED=false
```

## Como rodar o projeto

### Desenvolvimento Local

```bash
bun install
bun run dev
```

### Com Docker

```bash
docker-compose up -d --build
```

- A aplicação estará disponível em http://localhost:3000/
- O Nginx faz proxy reverso em http://localhost:8080/
- Redis disponível na porta 6380

Acesse http://localhost:3000/ para ver a API.

## Documentação

A documentação Swagger estará disponível em `/swagger` após subir o servidor.

## Coleção Postman

Você pode testar todas as rotas importando a coleção do Postman:

<a href="public/assets/postman/XPE-CHALLENGE.postman_collection.json" download="XPE-CHALLENGE.postman_collection.json">Baixar coleção Postman</a>

## Tecnologias Utilizadas

- **[Bun](https://bun.sh/):** Runtime ultrarrápido para JavaScript/TypeScript.
- **[Elysia](https://elysiajs.com/):** Framework web moderno, minimalista e performático.
- **[Sequelize](https://sequelize.org/):** ORM para integração com bancos de dados relacionais (PostgreSQL).
- **[ioredis](https://github.com/luin/ioredis):** Cliente Redis para Node.js/Bun.
- **[tsyringe](https://github.com/microsoft/tsyringe):** Injeção de dependências baseada em decorators.
- **[Swagger](https://swagger.io/):** Documentação automática da API.
- **[Argon2](https://github.com/ranisalt/node-argon2):** Hash de senhas seguro.
- **[Docker](https://www.docker.com/):** Contêineres para aplicação, Redis e Nginx.
- **Outros:** JWT, CORS, Cookies, dotenv, uuid, crypto-js.

## Estrutura de Pastas

```
src/
  Application/
    Contracts/    # Interfaces de contratos de aplicação
    Services/     # Serviços de aplicação (regras de negócio)
    UseCases/     # Casos de uso (orquestração de regras)
  Domain/
    Entities/     # Entidades do domínio
    Factory/      # Fábricas para criação/validação de entidades
    Ports/        # Portas para comunicação externa (ex: WebSocket)
    Repositories/ # Interfaces de repositórios do domínio
    Validators/   # Validadores de valor/objeto do domínio
  Infrastructure/
    Adapters/     # Adaptadores (ex: WebSocket)
    Database/     # Configuração e modelos do banco de dados
    Redis/        # Integração com Redis (pub/sub)
    Repositories/ # Implementações dos repositórios do domínio
  Presentation/
    Http/
      Controllers/ # Controladores HTTP (Elysia)
      Middlewares/ # Middlewares HTTP (ex: JWT, API Key)
      Routes/      # Rotas HTTP
      Types/       # Tipos auxiliares para contexto HTTP
      App.presentation.http.ts      # Configuração principal do app HTTP
      Server.presentation.http.ts   # Ponto de entrada do servidor
  Shared/
    Containers/
      Controllers/ # Injeção de dependências dos controladores
```

## Arquitetura

O projeto segue princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, separando responsabilidades em camadas bem definidas:

- **Domain:** Núcleo do negócio, com entidades, fábricas, validadores e contratos de repositório.
- **Application:** Serviços e casos de uso que orquestram regras de negócio e interações entre entidades.
- **Infrastructure:** Implementações concretas de persistência, comunicação externa e integrações.
- **Presentation:** Camada de entrada/saída, responsável por HTTP, middlewares, rotas e controladores.
- **Shared:** Componentes compartilhados, como containers de injeção de dependências.

## Princípios SOLID Aplicados

- **S - Single Responsibility Principle:** Cada classe/pasta tem responsabilidade única (ex: `Validators` só validam, `Factories` só criam entidades).
- **O - Open/Closed Principle:** Entidades e serviços são abertos para extensão (ex: novas validações, novos casos de uso) sem modificar código existente.
- **L - Liskov Substitution Principle:** Contratos/interfaces permitem substituição de implementações (ex: repositórios).
- **I - Interface Segregation Principle:** Interfaces especializadas para cada contexto (ex: contratos de repositório, contratos de aplicação).
- **D - Dependency Inversion Principle:** Injeção de dependências via `tsyringe`, controladores e serviços dependem de abstrações, não de implementações concretas.

## Rotas da API

> **Nota:** Todas as rotas exigem o header `x-api-key` para acesso exceto /swagger.

### AuthRouter

- **POST `/auth/login`**  
  - Protegida por `x-api-key`  
  - Não exige JWT (rota pública para login)

---

### ClientRouter

- **GET `/clients`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **GET `/clients/count`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **GET `/client/:id`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **POST `/client/name`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **POST `/client/create`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **PUT `/client/update/:id`**  
  - Protegida por `x-api-key` e `Authorization` (JWT)  
  - Exige autenticação

- **DELETE `/client/delete/:id`**  
  - Protegida por `x-api-key` e `Authorization` (JWT)  
  - Exige autenticação

---

### ProductRouter

- **GET `/products`**, **GET `/products/count`**, **GET `/product/:id`**, **POST `/product/name`**  
  - Protegidas por `x-api-key`  
  - Não exigem JWT

- **POST `/product/create`**, **PUT `/product/update/:id`**, **DELETE `/product/delete/:id**  
  - Protegidas por `x-api-key` e `Authorization` (JWT)  
  - Exigem autenticação

---

### CategoryRouter

- **GET `/categories`**, **POST `/category/name`**  
  - Protegidas por `x-api-key`  
  - Não exigem JWT

- **GET `/category/:id`**, **POST `/category/create`**, **PUT `/category/update/:id`**, **DELETE `/category/delete/:id**  
  - Protegidas por `x-api-key` e `Authorization` (JWT)  
  - Exigem autenticação

---

### UserRouter

- **POST `/user/create`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **POST `/user/me`**  
  - Protegida por `x-api-key` e `Authorization` (JWT)  
  - Exige autenticação

---

### OrderRouter

- **POST `/order/create`**  
  - Protegida por `x-api-key`  
  - Não exige JWT

- **GET `/orders`**, **GET `/order/:id`**, **PUT `/order/update/:id`**, **DELETE `/order/delete/:id**  
  - Protegidas por `x-api-key` e `Authorization` (JWT)  
  - Exigem autenticação

- **WebSocket `/ws/order`**  
  - Protegido por token na query string