// AppComponent ou um componente/serviço de inicialização específico
this.authService.checkAndRegisterUser().subscribe({
  next: (user) => {
    // Assumindo que o serviço retorna informações do usuário, incluindo seus papéis
    this.redirectUserBasedOnRole(user.roles);
  },
  error: (error) => {
    console.error('Erro durante a verificação/registro do usuário', error);
    // Redirecionar para página de erro ou de login novamente
  }
});

redirectUserBasedOnRole(roles: string[]) {
  if (roles.includes('Admin')) {
    this.router.navigate(['/admin']);
  } else if (roles.includes('Gestor')) {
    this.router.navigate(['/gestor']);
  } else {
    // Assumindo que todos os usuários são pelo menos Assessores se não tiverem outros papéis
    this.router.navigate(['/assessor']);
  }
}
