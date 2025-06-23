# Challenge XPE - First Module

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

## Como rodar o projeto

### Com Docker

```bash
docker-compose up --build
```

- A aplicação estará disponível em http://localhost:3000/
- O Nginx faz proxy reverso em http://localhost:8080/
- Redis disponível na porta 6380

### Desenvolvimento Local

```bash
bun install
bun run dev
```

Acesse http://localhost:3000/ para ver a API.

## Documentação

A documentação Swagger estará disponível em `/swagger` após subir o servidor.