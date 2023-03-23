# contact-list-api

API desenvolvida para auxiliar na organização de suas tarefas diárias

## Tabela de Conteúdos

- [Visão Geral](#1-vis%C3%A3o-geral)
- [Diagrama ER](#2-diagrama-er)
- [Comandos](#3---comandos)
- [Variáveis de Ambiente](#4---vari%C3%A1veis-de-ambiente)
- [Migrations](#5---migrations)
- [Endpoints](#6-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://github.com/colinhacks/zod)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Multer](https://github.com/expressjs/multer)

---

## 2. Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![Design sem nome (17)](https://user-images.githubusercontent.com/106760673/227273312-13ae97f1-ffb3-47c2-860c-2b2ae88e0be7.png)

---

## 3 - Comandos

[ Voltar para o topo ](#todo-list-api)

 - Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn install
```

- Para rodar a aplicação use o comando:

```shell
yarn dev
```

## 4 - Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.


## 5 - Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 6. Endpoints

[ Voltar para o topo ](#todo-list-api)

### Índice

- [Users]
    - [POST - /users]
    - [GET - /users]
    - [PATCH - /users]
    - [DELETE - /users]
    - [PATCH - /users/upload]
- [Login]
    - [POST - /login]
- [Contacts](#criar-tarefas)
    - [POST - /contacts]
    - [GET - /contacts]
    - [GET - /contacts/:contact_id]
    - [PATCH - /contacts/:contact_id]
    - [DELETE - /contacts/:contact_id]

---
