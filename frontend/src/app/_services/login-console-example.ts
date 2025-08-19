// Console.log para retornar os dados que a função store deve retornar
// quando os dados coincidirem no banco de dados

// Adicionar este console.log no método onSubmit do login.component.ts
// após a autenticação bem-sucedida

// Estrutura de dados esperada quando o login é bem-sucedido:
const userData = {
  id: 1,
  name: "Nome do Usuário",
  email: "usuario@example.com",
  category: "admin",
  email_verified_at: "2024-01-01 00:00:00",
  created_at: "2024-01-01 00:00:00",
  updated_at: "2024-01-01 00:00:00"
};

console.log('Dados do usuário autenticado:', userData);

