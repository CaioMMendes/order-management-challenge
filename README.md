# 📦 Orders Management API

API REST para gerenciamento de pedidos, desenvolvida com **Node.js**, **Express**, **TypeScript** e **MongoDB (Mongoose)**.  
O projeto conta com **Swagger (OpenAPI)** para documentação e teste das rotas.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Swagger (OpenAPI)
- Vitest
- Husky

---

## 🌐 Deploy

- **API em produção**  
  <https://order-management-challenge-production.up.railway.app>

- **Swagger (produção) (Mude o servidor para o de deploy)**  
  <https://order-management-challenge-production.up.railway.app/api-docs>

---

## ▶️ Como executar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/CaioMMendes/order-management-challenge
```

### 2. Entrar na pasta do projeto

```bash
cd order-management-challenge
```

### 3. Instalar as dependências

```bash
npm ci
```

### 4. Criar .env e colocar essas informações

```env
MONGO_URI=URI_DO_SEU_MONGODB
JWT_SECRET=sua_chave_secreta
```

### 5. Rodar o projeto em ambiente de desenvolvimento

```bash
npm run dev
```

## 🔗 Acessos locais

API
<http://localhost:3333>

Swagger (OpenAPI)
<http://localhost:3333/api-docs>

### 📌 Rotas disponíveis (visão geral)

As rotas abaixo podem ser consultadas com mais detalhes no Swagger.

#### 🔐 Autenticação

POST /auth/login

POST /auth/register

#### 📦 Pedidos

POST /orders

GET /orders

PATCH /orders/:id/advance
