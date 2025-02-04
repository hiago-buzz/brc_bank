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
| PORT     | numerico | Porta em que o servidor será executado   |


4. Crie o banco de dados

```bash
npx knex migrate:latest
```

5. Inicie o servidor    

```bash
npm start   

```         








