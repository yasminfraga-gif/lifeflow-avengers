# LifeFlow — Setup com PostgreSQL

## Estrutura do projeto


lifeflow/
├── database/
│   └── schema.sql          ← Schema do banco de dados
├── backend/
│   ├── server.js           ← API Express (Node.js)
│   ├── db.js               ← Conexão com PostgreSQL
│   ├── .env.example        ← Variáveis de ambiente (copie para .env)
│   └── package.json
└── frontend/
    ├── index.html          ← HTML original (sem alterações)
    ├── style.css           ← CSS original (sem alterações)
    └── script.js           ← JS modificado com chamadas à API


---

## 1. Criar o banco de dados PostgreSQL

bash
# Conecta ao PostgreSQL como superusuário
psql -U postgres

# Dentro do psql:
CREATE DATABASE lifeflow;
\q

# Executa o schema
psql -U postgres -d lifeflow -f database/schema.sql


---

## 2. Configurar o backend

bash
cd backend

# Copia o arquivo de configuração
cp .env.example .env

# Edita o .env com seus dados:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=lifeflow
# DB_USER=postgres
# DB_PASSWORD=sua_senha

# Instala dependências
npm install

# Inicia o servidor
npm run dev      # com nodemon (reinicia automaticamente)
# ou
npm start        # produção


O servidor sobe em: *http://localhost:3000*

---

## 3. Abrir o frontend

Abra o arquivo frontend/index.html diretamente no navegador,
ou sirva com qualquer servidor estático:

bash
# Com Python (simples):
cd frontend
python3 -m http.server 8080
# Acesse: http://localhost:8080

# Com Node/npx:
npx serve frontend


> *Importante:* O backend precisa estar rodando em localhost:3000
> antes de usar o site. Se mudar a porta, atualize a constante
> API_URL no início de frontend/script.js.

---

## Tabelas criadas

| Tabela              | O que armazena                        |
|---------------------|---------------------------------------|
| usuarios          | Cadastro e login dos usuários         |
| tarefas           | Lista de tarefas com status           |
| rotina            | Planejamento semanal por dia          |
| humor             | Histórico de humor diário             |
| habitos           | Hábitos saudáveis por data            |
| sessoes_pomodoro  | Sessões de foco concluídas            |

---

## Endpoints da API

| Método | Rota                         | Descrição                    |
|--------|------------------------------|------------------------------|
| POST   | /api/login                   | Cria ou autentica usuário    |
| GET    | /api/usuario/:id             | Dados do usuário             |
| PATCH  | /api/usuario/:id/premium     | Ativa plano premium          |
| GET    | /api/tarefas/:usuarioId      | Lista tarefas                |
| POST   | /api/tarefas                 | Cria tarefa                  |
| PATCH  | /api/tarefas/:id             | Marca concluída/pendente     |
| DELETE | /api/tarefas/:id             | Remove tarefa                |
| GET    | /api/rotina/:usuarioId       | Busca rotina semanal         |
| PUT    | /api/rotina                  | Salva/atualiza dia da rotina |
| POST   | /api/humor                   | Registra estado de humor     |
| GET    | /api/humor/:usuarioId        | Histórico de humor           |
| GET    | /api/habitos/:usuarioId      | Hábitos do dia               |
| POST   | /api/habitos                 | Salva hábitos                |
| POST   | /api/pomodoro                | Registra sessão pomodoro     |
| GET    | /api/health                  | Verifica conexão com BD      |
