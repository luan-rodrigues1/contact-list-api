# contact-list-api

API desenvolvida para auxiliar na organização de suas tarefas diárias

## Tabela de Conteúdos

- [Visão Geral](#1-vis%C3%A3o-geral)
- [Diagrama ER](#2-diagrama-er)
- [Comandos](#3---comandos)
- [Variáveis de Ambiente](#4---vari%C3%A1veis-de-ambiente)
- [Migrations](#5---migrations)
- [Endpoints](#6-endpoints)
- [Documentação](#7-documenta%C3%A7%C3%A3o)

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

[ Voltar para o topo ](#contact-list-api)

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

[ Voltar para o topo ](#contact-list-api)

### Índice

- [Users]
    - [POST - /users](#cria%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [GET - /users](#listar-informa%C3%A7%C3%B5es-do-usu%C3%A1rio-logado)
    - [PATCH - /users](#atualiza%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [DELETE - /users](#deletar-usu%C3%A1rio)
    - [PATCH - /users/upload](#atualiza%C3%A7%C3%A3o-da-foto-de-perfil)
- [Login]
    - [POST - /login](#login-de-usu%C3%A1rio)
- [Contacts]
    - [POST - /contacts](#criar-contato)
    - [GET - /contacts](#listar-todos-os-contatos-do-usu%C3%A1rio)
    - [GET - /contacts/:contact_id](#listar-um-contato-pelo-id)
    - [PATCH - /contacts/:contact_id](#atualizar-contato)
    - [DELETE - /contacts/:contact_id](#deletar-contato)

---

## 7. Documentação

### **Criação de Usuário**
### `/users`

### Exemplo de Request:
```
POST /users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Luan rodrigues",
	"email": "luan_rodrigues1@mail.com",
	"cell_phone": "21 981528060",
	"password": "1234"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "b6caa420-9857-402d-b6dd-2bc45456506c",
	"name": "Luan rodrigues",
	"email": "luan_rodrigues1@mail.com",
	"cell_phone": "21 981528060",
	"profile_picture": null,
	"created_at": "2023-03-28T00:25:54.972Z",
	"updated_at": "2023-03-28T00:25:54.972Z",
	"deleted_at": null,
	"is_active": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | E-mail already registered |
| 409 Conflict   | Cell phone already registered |

---

### **Listar informações do usuário logado**
### `/users`

### Exemplo de Request:
```
GET /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "b6caa420-9857-402d-b6dd-2bc45456506c",
	"name": "Luan rodrigues",
	"email": "luan_rodrigues1@mail.com",
	"cell_phone": "21 981528060",
	"profile_picture": null,
	"created_at": "2023-03-28T00:25:54.972Z",
	"updated_at": "2023-03-28T00:25:54.972Z",
	"deleted_at": null,
	"is_active": true,
	"contacts": []
}
```

### Observações:
Na requisição apenas é necessário o TOKEN, a aplicação ficará responsável em buscar o id do usuário no token e retorna ele.

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Atualização de Usuário**
### `/users`

### Exemplo de Request:
```
PATCH /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Luan rodrigues carlos",
	"email": "luan_rodrigues_carlos1@mail.com",
	"password": "12345"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "b6caa420-9857-402d-b6dd-2bc45456506c",
	"name": "Luan rodrigues carlos",
	"email": "luan_rodrigues_carlos1@mail.com",
	"cell_phone": "21 981528060",
	"profile_picture": null,
	"created_at": "2023-03-28T00:25:54.972Z",
	"updated_at": "2023-03-28T00:39:43.170Z",
	"deleted_at": null,
	"is_active": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 409 Conflict   | A user with this email already exists |

---

### **Deletar Usuário**
### `/users`

### Exemplo de Request:
```
DELETE /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```

```json
Nenhuma informação é retornada nessa requisição
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Atualização da foto de perfil**
### `/users/upload`

### Exemplo de Request:
```
PATCH /users/upload
Authorization: Bearer {token}
Content-type: Multipart Form
```

### Corpo da Requisição:
```Multipart Form
avatar: <Arquivo de imagem>
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "b6caa420-9857-402d-b6dd-2bc45456506c",
	"name": "Luan rodrigues carlos",
	"email": "luan_rodrigues_carlos1@mail.com",
	"cell_phone": "21 981528060",
	"profile_picture": "1679964752241_perfil.jpeg",
	"created_at": "2023-03-28T00:25:54.972Z",
	"updated_at": "2023-03-28T00:52:32.323Z",
	"deleted_at": null,
	"is_active": true
}
```
### Observações:
Só é possível enviar arquivo de imagem do tipo jpeg, pjpeg e png, caso seja passado outro tipo de arquivo a requisição irá retornar erro 400

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad Request   | Invalid file type |
| 400 Bad Request   | No files have been uploaded |
| 401 Unauthorized   | Invalid Token |

---

### **Login de Usuário**
### `/login`

### Exemplo de Request:
```
POST /login
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "luanRodrigues@mail.com",
	"password": "1234"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ImYzNTkzZDc3LWQyNDEtNGU5MS04OGFjLWMyYzZkN2VjOTYxNyIsImlhdCI6MTY3NzcwODk0OCwiZXhwIjoxNjc3Nzk1MzQ4LCJzdWIiOiJmMzU5M2Q3Ny1kMjQxLTRlOTEtODhhYy1jMmM2ZDdlYzk2MTcifQ.DS4tXxU-gb1Ksp4zrxljvwYoo8rtRvcORaGbI18dbag"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad Request | user no actived |
| 403 Forbiden | user or password invalid |

---

### **Criar Contato**
### `/contacts`

### Exemplo de Request:
```
POST /contacts
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Lucas silva",
	"email": "lucas_csilva@mail.com",
	"cell_phone": "21 981528073",
	"description": "Dentista"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "b41579a7-3841-4ca3-83ac-8bfd6d82af6b",
	"name": "Lucas silva",
	"description": "Dentista",
	"email": "lucas_csilva@mail.com",
	"cell_phone": "21 981528073",
	"profile_picture": null,
	"created_at": "2023-03-28T01:13:04.154Z",
	"updated_at": "2023-03-28T01:13:04.154Z"
}
```

### Observações:
Caso o E-mail e Telefone do contato que está sendo criado seja o mesmo de algum usuário cadastrado na aplicação, a foto de perfil dele será adicionado no campo “profile_picture”, isso caso o usuário tenha foto em seus dados

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | There is already a user in your contacts with the same email and cell phone |
| 401 Unauthorized   | Invalid Token |

---

### **Listar todos os contatos do usuário**
### `/contacts`

### Exemplo de Request:
```
GET /contacts
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
[
	{
		"id": "b41579a7-3841-4ca3-83ac-8bfd6d82af6b",
		"name": "Lucas silva",
		"description": "Dentista",
		"email": "lucas_csilva@mail.com",
		"cell_phone": "21 981528073",
		"profile_picture": null,
		"created_at": "2023-03-28T01:13:04.154Z",
		"updated_at": "2023-03-28T01:13:04.171Z"
	},
	{
		"id": "891d604e-5a1c-444d-84db-37eb22b7b91b",
		"name": "Levi carlos",
		"description": "Primo",
		"email": "levi_carlos@mail.com",
		"cell_phone": "21 981528072",
		"profile_picture": null,
		"created_at": "2023-03-28T01:06:28.378Z",
		"updated_at": "2023-03-28T01:06:28.396Z"
	}
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Listar um contato pelo id**
### `/contacts/{id do contato}`

### Exemplo de Request:
```
GET /contacts/b41579a7-3841-4ca3-83ac-8bfd6d82af6b
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "b41579a7-3841-4ca3-83ac-8bfd6d82af6b",
	"name": "Lucas silva",
	"description": "Dentista",
	"email": "lucas_csilva@mail.com",
	"cell_phone": "21 981528073",
	"profile_picture": null,
	"created_at": "2023-03-28T01:13:04.154Z",
	"updated_at": "2023-03-28T01:13:04.171Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 401 Unauthorized   | missing permissions |
| 404 Unauthorized   | Contact not found |

---

### **Atualizar Contato**
### `/contacts/{id do contato}`

### Exemplo de Request:
```
PATCH /contacts/b41579a7-3841-4ca3-83ac-8bfd6d82af6b
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Dr Lucas Silva",
	"email": "luanteste9@mail.com",
	"cell_phone": "21 981528074",
	"description": "Médico"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "b41579a7-3841-4ca3-83ac-8bfd6d82af6b",
	"name": "Dr Lucas Silva",
	"description": "Médico",
	"email": "luanteste9@mail.com",
	"cell_phone": "21 981528074",
	"profile_picture": null,
	"created_at": "2023-03-28T01:13:04.154Z",
	"updated_at": "2023-03-28T12:44:22.243Z"
}
```

### Observações:
Só é possível alterar as propiedades "name", "email", "cell_phone" e "description", caso seja passado outro valor será ignorado


### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 401 Unauthorized   | missing permissions |
| 404 Unauthorized   | Contact not found |

---

### **Deletar Contato**
### `/contacts/{id do contato}`

### Exemplo de Request:
```
DELETE /contacts/b41579a7-3841-4ca3-83ac-8bfd6d82af6b
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```

```json
Nenhuma informação é retornada nessa requisição
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 401 Unauthorized   | missing permissions |
| 404 Unauthorized   | Contact not found |

---
