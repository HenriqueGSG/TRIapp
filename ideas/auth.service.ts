import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Simula a obtenção de dados do usuário após o login SSO
  private getUserDataFromSSO(): Observable<any> {
    // Aqui você implementaria a lógica para obter os dados do usuário
    // do sistema de SSO da empresa após o login bem-sucedido.
    return of({ email: 'user@example.com' }); // Exemplo
  }

  // Verifica se o usuário existe na aplicação e registra se necessário
  checkAndRegisterUser(): Observable<any> {
    return this.getUserDataFromSSO().pipe(
      switchMap(userData => {
        // Substitua a URL pelo endpoint correto do seu backend
        return this.http.post('/api/users/check-and-register', userData).pipe(
          catchError(error => {
            // Tratar erros aqui, por exemplo, rejeitar o fluxo se não puder registrar
            console.error('Erro ao verificar/registrar usuário', error);
            return of(null); // ou throw new Error('Não foi possível verificar/registrar o usuário');
          })
        );
      })
    );
  }

  // Outros métodos úteis, como login, logout, getToken, setUserRole, getUserRole, etc.
}
