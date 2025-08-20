
console.log('Dados do usuário autenticado:', {
  id: user.id,
  name: user.name,
  email: user.email,
  category: user.category,
  email_verified_at: user.email_verified_at,
  created_at: user.created_at,
  updated_at: user.updated_at
});

this.usersService.getUser().subscribe({
  next: (userData) => {
    console.log('Dados retornados pela função store:', userData);
   
  }
});
