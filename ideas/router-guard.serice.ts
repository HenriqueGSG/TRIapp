import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importe seu AuthService

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = next.data['roles'] as Array<string>; // Os papéis requeridos são passados através dos dados da rota
    const userRoles = this.authService.getUserRoles(); // Suponha que isso retorna os papéis do usuário atual

    // Verifica se o usuário tem algum dos papéis requeridos
    const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));

    if (!hasRequiredRole) {
      // Se o usuário não tem o papel necessário, redirecione para uma página de 'Não Autorizado' ou para o dashboard
      this.router.navigate(['/nao-autorizado']); // Ajuste conforme necessário
      return false;
    }

    return true; // O usuário pode acessar a rota
  }
}
