# API de Autenticação

API para autenticação de usuários desenvolvida em Node.js com Knex.js para consumo pelo frontend.

## Pré-requisitos

- Node.js
- NPM ou Yarn

## Instalação

1. Clone o repositório

```bash
git clone [url-do-repositorio]
```

2. Instale as dependências

```bash
npm install
```


3. Configure o ambiente

```bash
cp .env
```
| Variável | Tipo    | Descrição                                |
|----------|---------|------------------------------------------|
| PORT     | 3333 | Porta em que o servidor será executado   |


4. Crie o banco de dados

```bash
npx knex migrate:latest
```

5. Inicie o servidor    

```bash
npm start   

```         

6. Acesse a API no navegador

```bash
http://localhost:3333
```

7. Consumo da API


### Endpoints da API

#### Autenticação
- POST `/login`
  ```json
  {
    "cpfCnpj": "string",
    "password": "string"
  }
  ```

#### Contas Bancárias
- POST `/account` - Criar nova(s) conta(s)
  ```json
  [
    {
      "cpfCnpj": "string",
      "bank": "string",
      "account_number": "string",
      "agency": "string", 
      "digit": "string"
    }
  ]
  ```

- GET `/account?cpfCnpj=123456789` - Listar contas de um usuário

- GET `/account/:id` - Buscar conta específica

- PUT `/account/:id` - Atualizar conta
  ```json
  {
    "bank": "string",
    "account_number": "string",
    "agency": "string",
    "digit": "string"
  }
  ```

- DELETE `/account/:id` - Excluir conta

#### Usuários
- POST `/user` - Criar novo usuário
  ```json
  {
    "cpfCnpj": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "image": "string",
    "password": "string"
  }
  ```

- GET `/user/:id` - Buscar usuário específico

- PUT `/user/:id` - Atualizar usuário
  ```json
  {
    "name": "string",
    "email": "string", 
    "phone": "string",
    "image": "string",
    "password": "string"
  }
  ```

- DELETE `/user/:id` - Excluir usuário

#### Transações
- POST `/transaction` - Criar nova transação
  ```json
  {
    "cpfCnpj": "string",
    "transaction_type_id": 1,
    "amount": 100.00,
    "bank": "string",
    "account_number": "string",
    "agency": "string",
    "digit": "string"
  }
  ```

- GET `/transaction?cpfCnpj=123456789` - Listar transações
  Parâmetros opcionais:
  - transaction_type_id
  - startDate
  - endDate
  - orderBy
  - order







