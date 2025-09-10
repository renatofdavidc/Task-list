# -> Task List API  
Um projeto simples de lista de tarefas desenvolvido em **AdonisJS 6**, com foco em praticar **boas práticas de programação** e **autenticação JWT**.  

O objetivo foi criar um CRUD básico, mas estruturado de forma profissional, aplicando conceitos que são usados em projetos reais.  

---

## > Tecnologias
- [AdonisJS 6](https://adonisjs.com/) (Node.js framework)  
- TypeScript  
- JWT para autenticação  
- Banco de dados relacional (via ORM do Adonis)  

---

## > Funcionalidades
- Registro e login de usuários (com JWT)  
- CRUD de tarefas vinculado ao usuário autenticado  
- Marcar tarefa como concluída
- Editar informações de tarefas  
- Middleware para proteger rotas  
- Validação de entrada com **Validators**  
- Estrutura organizada (Controllers → Services → DAO → Models)  

---

## > Rotas Principais

### > Autenticação
- `POST /register` → Criar usuário  
- `POST /login` → Login e retorno de token JWT  

### > Tarefas (rotas autenticadas)
- `POST /tasks/create` → Criar tarefa  
- `GET /tasks/all` → Listar tarefas do usuário  
- `PUT /tasks/update/:id` → Atualizar tarefa  
- `PUT /tasks/complete/:id` → Marcar como concluída  

---

## > Como rodar localmente
```bash
# Clonar repositório
git clone https://github.com/renatofdavidc/Task-list.git

# Entrar no diretório
cd Task-list

# Instalar dependências
npm install

# Configurar .env (baseado no .env.example)
cp .env.example .env

# Rodar migrations
node ace migration:run

# Iniciar servidor
npm run dev
```

---
