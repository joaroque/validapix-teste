![Logo](https://validapix.tech/assets/images/logo/logo.png)

# Simulador de PIX - API Bancária

Este é um projeto desenvolvido como parte de um desafio técnico. O objetivo é criar uma API bancária que permita gerenciar clientes e simular transações PIX, incluindo um painel front-end para interagir com a API.

---

## 🚀 **Funcionalidades**

### **Back-end**

- Criação de clientes com os campos: `fullname`, `cpf`,`balance` e uma lista de PIX vazia.
- Listagem de todos os PIX de um cliente específico.
- Adicionar um PIX à lista de um cliente, simulando a entrada de valores na conta.
- Implementação de sistema de saldo.

### **Front-end**

- Cadastro de novos clientes.
- Login do cliente.
- Adição de PIX à lista de um cliente.
- Visualização de todos os PIX que entraram na conta do cliente.

---

## 🛠️ **Tecnologias Utilizadas**

### **Back-end**

- **Node.js**: Ambiente de execução.
- **Express**: Framework web para Node.js.
- **Prisma**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação de usuários.

### **Front-end**

- **React**: Biblioteca para construção de interfaces.
- **Typescript**: Superset do JavaScript com tipagem estática.
- **TailwindCSS**: Biblioteca para estilização.

### **DevOps**

- **Docker**: Containerização para simplificar a execução do projeto.
- **Docker Compose**: Orquestração dos serviços (API, Front-end, Banco de Dados).

---

## 📂 **Estrutura do Projeto**

```
📦 validapix-teste
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## 📋 **Pré-requisitos**

- **Docker** e **Docker Compose** instalados ([Guia de Instalação](https://docs.docker.com/get-docker/)).
- **Node.js** e **npm** caso queira iniciar manualmente sem Docker.

---

## 🧑‍💻 **Como Executar o Projeto**

### **1. Clone o Repositório**

```bash
git clone https://github.com/seuusuario/validapix-teste.git
cd validapix-teste
```

### **2. Suba os Containers com Docker**

Certifique-se de estar na raiz do projeto e execute:

```bash
docker compose up --build
```

Isso irá:

- Construir e iniciar os containers do back-end, front-end e banco de dados.
- Acessar:
  - Front-end: http://localhost:4000
  - Back-end: http://localhost:3000

### **3. Configuração Manual (Sem Docker)**

#### Back-end

Acesse a pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o banco de dados no arquivo .env:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

Rode as migrações do Prisma:

```bash
npm run migrate
```

Inicie o servidor:

```bash
npm run start
```

O servidor estará disponível em http://localhost:3000.

Visualize os dados do banco:

```bash
npm run studio
```

Isso ira abrir uma página do prisma studio

#### Front-end

Acesse a pasta do front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run start
```

O front-end estará disponível em http://localhost:4000.

---

### **🛤️ Principais Rotas da API**

| Método | Endpoint     | Descrição                              |
| ------ | ------------ | -------------------------------------- |
| POST   | /login       | Inicia sessão do cliente.              |
| POST   | /clients     | Criação de um cliente.                 |
| GET    | /clients/pix | Lista todos os PIX de um cliente.      |
| POST   | /clients/pix | Adiciona um PIX à lista de um cliente. |
