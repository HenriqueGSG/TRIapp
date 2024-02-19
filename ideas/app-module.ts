import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GestorComponent } from './gestor/gestor.component';
import { AssessorComponent } from './assessor/assessor.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'gestor',
    component: GestorComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Gestor'] }
  },
  {
    path: 'assessor',
    component: AssessorComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Assessor I', 'Assessor II', 'Assessor III'] } // Adapte conforme a sua necessidade
  },
  // Defina uma rota padrão se necessário, por exemplo, redirecionar para a página de login ou dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Você pode querer adicionar uma rota para 'não autorizado' ou outras páginas específicas
  { path: '**', redirectTo: '/nao-encontrado' } // Página não encontrada ou semelhante
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
