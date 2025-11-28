# devops-strapi

Aplicação Strapi preparada para desenvolvimento e deploy.

## Visão geral

Este repositório contém uma aplicação criada com Strapi (headless CMS). O projeto traz configurações prontas para desenvolvimento local usando `sqlite` por padrão, scripts para desenvolvimento, build do painel administrativo e um exemplo de seed.

## Pré-requisitos

- **Node.js**: versão compatível entre `18` e `22`.
- **pnpm** (recomendado) ou `npm`/`yarn`.

Instalar dependências:

```powershell
pnpm install
```

## Scripts úteis

- `pnpm dev` / `pnpm run develop`: inicia Strapi em modo de desenvolvimento (hot-reload).
- `pnpm start`: inicia Strapi em modo produção.
- `pnpm build`: gera os assets do painel admin.
- `pnpm run seed:example`: executa o script `scripts/seed.js` para popular dados de exemplo.

## Configuração (variáveis de ambiente)

As configurações principais são lidas via variáveis de ambiente. Arquivos e locais relevantes:

- `config/server.ts`: `HOST`, `PORT`, `APP_KEYS`.
- `config/database.ts`: `DATABASE_CLIENT` (padrão `sqlite`), `DATABASE_FILENAME` (quando `sqlite`), ou variáveis para `postgres`/`mysql`.

Exemplo mínimo de `.env` para desenvolvimento (arquivo não incluído no repo):

```powershell
HOST=0.0.0.0
PORT=1337
APP_KEYS=chave1,chave2,chave3
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

Para usar Postgres ou MySQL, ajuste `DATABASE_CLIENT` para `postgres` ou `mysql` e configure as variáveis `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` ou `DATABASE_URL`.

## Banco de dados

Por padrão o projeto usa `sqlite` (arquivo em `.tmp/data.db`). As configurações de conexão estão em `config/database.ts` e podem ser alteradas via variáveis de ambiente.

## Desenvolvimento

1. Instale dependências: `pnpm install`
2. Inicie em modo dev: `pnpm dev`
3. Abra o painel administrativo em `http://localhost:1337/admin` (após criar um usuário inicial, se necessário)

Comandos de exemplo:

```powershell
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm run seed:example
```

## Testes

O projeto inclui dependências para testes com Playwright. Para rodar testes (se houver testes definidos):

```powershell
pnpm exec playwright test
```

## Deploy

Passos gerais para deploy:

1. Ajuste variáveis de ambiente no servidor (APP_KEYS, DATABASE_* etc.).
2. Rode `pnpm build` para gerar o admin estático.
3. Execute `pnpm start` para iniciar a aplicação em modo produção.

Observação: adaptar instruções de deploy conforme provedor (Docker, Heroku, serviços gerenciados).

## Estrutura principal do repositório

- `config/` - configurações do Strapi (server, database, plugins, middlewares).
- `src/` - bootstrap e registro da aplicação.
- `api/` - definições de content-types, controllers, services e rotas.
- `scripts/seed.js` - script para popular dados de exemplo.
- `public/` e `data/uploads` - arquivos públicos e uploads.

## Contribuição

Contribuições são bem-vindas. Abra uma issue ou um pull request descrevendo a mudança.

## Licença

Verifique a licença do projeto ou adicione uma conforme necessário.

---

Se quiser, adapto este README com instruções específicas de deploy (Docker, CI/CD) ou exemplos de `.env` mais completos.
