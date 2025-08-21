# Farmácia Beta - Sistema de Gestão de Produtos Farmacêuticos

## 📋 Visão Geral

O **Farmácia Beta** é uma aplicação web completa para gestão de produtos farmacêuticos, desenvolvida com arquitetura moderna separando backend e frontend. O sistema permite cadastro de produtos, gerenciamento de estoque, carrinho de compras e autenticação de usuários.

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Laravel 11** - Framework PHP moderno e robusto
- **PHP 8.2+** - Linguagem backend
- **MySQL** - Banco de dados relacional
- **Laravel Sanctum** - Autenticação via tokens API
- **Composer** - Gerenciador de dependências PHP

### Frontend
- **Angular 18** - Framework JavaScript moderno
- **TypeScript** - Superset JavaScript com tipagem estática
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **Angular Material** - Componentes UI (implícito)

## 📦 Funcionalidades

### ✅ Implementadas
- **Autenticação de Usuários**
  - Login seguro com tokens JWT
  - Registro de novos usuários
  - Sessões persistentes

- **Gestão de Produtos**
  - CRUD completo de produtos farmacêuticos
  - Upload de imagens
  - Informações detalhadas (nome, descrição, preço, estoque)

- **Carrinho de Compras**
  - Adicionar/remover produtos
  - Atualizar quantidades
  - Persistência do carrinho

- **Interface Responsiva**
  - Design adaptativo para desktop e mobile
  - Componentes reutilizáveis

## 🏗️ Arquitetura

```
farmaciaBeta/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
├── frontend/               # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   └── ...
│   └── angular.json
└── README.md
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Angular CLI

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

### Configuração do Banco
```bash
# Criar banco de dados
mysql -u root -p
CREATE DATABASE farmacia_beta;

# Configurar .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=farmacia_beta
DB_USERNAME=root
DB_PASSWORD=
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/login` - Login de usuário
- `POST /api/register` - Registro de novo usuário
- `POST /api/logout` - Logout do usuário

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/{id}` - Buscar produto específico
- `POST /api/products` - Criar novo produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Deletar produto

### Carrinho
- `GET /api/cart` - Ver carrinho do usuário
- `POST /api/cart/add` - Adicionar produto ao carrinho
- `PUT /api/cart/update` - Atualizar quantidade
- `DELETE /api/cart/remove` - Remover produto do carrinho

## 🎯 Estrutura de Pastas

### Backend (Laravel)
```
backend/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/           # Controllers de autenticação
│   │   ├── ProductController.php
│   │   ├── CartController.php
│   │   └── UserController.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── product.php
│   │   ├── cart.php
│   │   └── cart_item.php
├── database/
│   ├── migrations/         # Estrutura do banco
│   └── seeders/           # Dados iniciais
└── routes/
    ├── api.php            # Rotas da API
    └── auth.php           # Rotas de autenticação
```

### Frontend (Angular)
```
frontend/src/app/
├── components/
│   ├── cardItem/          # Card de produto
│   ├── header/           # Header da aplicação
│   └── blank-box/        # Componente auxiliar
├── pages/
│   ├── login/            # Página de login
│   ├── showcase/         # Vitrine de produtos
│   ├── info-product/     # Detalhes do produto
│   ├── edit-product/     # Edição de produto
│   └── register-product/ # Cadastro de produto
├── services/
│   ├── auth.service.ts   # Serviço de autenticação
│   ├── product.service.ts # Serviço de produtos
│   └── users.service.ts  # Serviço de usuários
└── auth/                 # Interceptores e guards
```

## 🚀 Como Executar

1. **Iniciar Backend**
```bash
cd backend
php artisan serve --port=8000
```

2. **Iniciar Frontend**
```bash
cd frontend
ng serve --port=4200
```

3. **Acessar Aplicação**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000
- Documentação API: http://localhost:8000/api/documentation

## 🔐 Credenciais de Teste

Após rodar os seeders, você pode usar:
- **Email**: admin@example.com
- **Senha**: admin123

## 📝 Comandos Úteis

```bash
# Backend
php artisan migrate:fresh --seed    # Resetar banco com dados
php artisan route:list             # Listar rotas
php artisan test                   # Executar testes

# Frontend
ng build --configuration production  # Build de produção
ng test                              # Executar testes
ng lint                              # Verificar código
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Nicolas Nunes Lima** - Desenvolvimento inicial

---

