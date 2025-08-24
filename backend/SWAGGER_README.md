# Documentação Swagger da API Farmacia

Esta documentação foi criada para facilitar o entendimento e uso da API da aplicação Farmacia.

## Como acessar a documentação

1. Certifique-se de que o servidor Laravel está rodando:
   ```bash
   cd backend
   php artisan serve
   ```

2. Acesse a documentação Swagger UI em:
   ```
   http://localhost:8000/api-docs
   ```

## Endpoints Documentados

A documentação inclui os seguintes endpoints:

### Produtos
- **GET /products** - Lista produtos com filtros opcionais
- **POST /products** - Cria um novo produto
- **GET /products/{id}** - Obtém um produto específico
- **PUT /products/{id}** - Atualiza um produto existente
- **DELETE /products/{id}** - Remove um produto

## Estrutura da Documentação

A documentação está organizada em:
- `backend/swagger/openapi.json` - Especificação OpenAPI 3.0 em formato JSON
- `backend/public/swagger-ui.html` - Interface Swagger UI
- `backend/app/Http/Controllers/SwaggerController.php` - Controller para servir a UI
- `backend/routes/web.php` - Rota `/api-docs` para acessar a documentação

## Atualizando a Documentação

Para atualizar a documentação quando novos endpoints forem adicionados:

1. Edite o arquivo `backend/swagger/openapi.json`
2. Adicione os novos endpoints seguindo o padrão OpenAPI 3.0
3. A documentação será automaticamente atualizada na interface Swagger UI

## Tecnologias Utilizadas

- **OpenAPI 3.0** - Especificação padrão para documentação de APIs
- **Swagger UI** - Interface interativa para explorar e testar a API
- **Laravel** - Framework PHP para servir a documentação
