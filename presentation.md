# Apresentação do Projeto — DevOps A3
Este repositório contém uma aplicação Strapi utilizada para a entrega do trabalho do módulo de DevOps. O objetivo do projeto foi implementar testes end-to-end com Playwright, configurar pipelines de CI utilizando GitHub Actions para executar esses testes em Pull Requests, criar workflows para build e push de imagem Docker e, por fim, automatizar o deploy via Terraform para um serviço em nuvem.

## O que foi implementado
* **Testes end-to-end com Playwright:**
  A pasta `tests/` contém testes que exercitam o painel administrativo do Strapi. Em destaque:

  * `tests/strapi.spec.ts`: testes que criam uma nova *category* e um novo *author*, atendendo ao requisito de cobrir pelo menos duas das três collections existentes.
  * `tests/failing.spec.ts`: teste propositalmente falho para demonstrar um Pull Request com validação quebrada.

* **Configuração do Playwright:**
  O arquivo `playwright.config.ts` está configurado para execução em ambiente de CI, com retries, múltiplos workers, reporter HTML e `forbid-only` habilitado quando `CI=true`.

* **Pull Requests e GitHub Actions:**
Para cada pull request foi criada uma branch e feito merge para a branch master.
![branches](img/branches.png)

![actions](img/actions.png)

### Pull Request com falha (Failing Checks)
O primeiro Pull Request foi aberto contendo alterações propositalmente inválidas. Ao ser criado, dois workflows foram executados automaticamente pelo GitHub Actions:

* **PR Check – Tests:** responsável por executar testes e validações.
* **PR Conditional Failure:** workflow configurado para falhar quando a branch atende a uma condição específica.

Ambos os workflows retornaram falha, resultando no estado:

> **“All checks have failed”**

Mesmo sem conflitos com a branch principal, o PR não foi liberado para merge, evidenciando o papel da pipeline em impedir a integração de código defeituoso.

![prfail](img/pr2.png)

### Pull Request válido (Successful Checks)
Um segundo Pull Request foi criado com as correções necessárias. Os mesmos workflows foram executados novamente:

* **PR Check – Tests:** executado com sucesso.
* **PR Conditional Failure:** também bem-sucedido, já que a condição de falha não estava mais presente.

O estado final foi:

> **“All checks have passed”**

Com isso, o merge para a branch principal foi liberado, demonstrando a importância das validações automáticas na garantia de estabilidade e integridade do código.

![prsuccess](img/pr1.png)

## O que não foi concluído
* **Build e Push de imagem Docker:**
  A configuração da action responsável pelo build e push da imagem Docker não foi concluída e foi removida do repositório. O projeto inclui um `Dockerfile` funcional para construção da imagem localmente.

![dockerfail](img/dockerfail.png)

* **Deploy via Terraform / Azure:**
  O diretório `terraform/` contém um `main.tf` configurado para Azure Container Instances (ACI). No entanto, a action que executaria `terraform init` e `terraform apply` não está presente na versão atual.

## Como rodar e verificar localmente

### Instalação das dependências:

```powershell
pnpm install
```

### Instalação dos navegadores Playwright (apenas uma vez):

```powershell
npx playwright install
```

### Execução da aplicação Strapi (em uma janela separada):

```powershell
pnpm dev
```

### Execução dos testes Playwright:

```powershell
pnpm exec playwright test
```

Os testes assumem que o painel administrativo do Strapi está acessível em `http://localhost:1337/admin` e que existe um usuário administrador com as credenciais referenciadas nos testes (`admin@satc.edu.br` / `welcomeToStrapi123`). Ajustes podem ser necessários dependendo do ambiente local.
