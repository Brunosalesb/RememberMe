import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = new BehaviorSubject<Usuario>(null);
  private temporizadorExpiracaoToken: any;

  constructor(private http: HttpClient, private router: Router) { }

  criarConta(email: string, senha: string, nome: string, sobrenome: string, ) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBf-ycnaCCPmd7hoXl_ikx0jurJH79XVgg', {
      email: email,
      password: senha,
      displayName: nome + ' ' + sobrenome,
      returnSecureToken: true
    }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const usuarioCarregado = new Usuario(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (usuarioCarregado.token) {
      this.usuario.next(usuarioCarregado);
      const tempoExpiracao = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(tempoExpiracao);
    }
  }

  login(email: string, senha: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBf-ycnaCCPmd7hoXl_ikx0jurJH79XVgg', {
      email: email,
      password: senha,
      returnSecureToken: true
    }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.temporizadorExpiracaoToken = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.usuario.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.temporizadorExpiracaoToken) {
      clearTimeout(this.temporizadorExpiracaoToken);
    }
    this.temporizadorExpiracaoToken = null;
  }

  private handleAuthentication(email: string, usuarioId: string, token: string, tempoExpiracao: number) {
    const dataExpiracao = new Date(new Date().getTime() + tempoExpiracao * 1000);
    const usuario = new Usuario(email, usuarioId, token, dataExpiracao);
    this.usuario.next(usuario);
    this.autoLogout(tempoExpiracao * 1000);
    localStorage.setItem('userData', JSON.stringify(usuario));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Houve um erro, tente novamente!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'já existe um usuário com esse email.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'O email não foi encontrado.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'A senha está incorreta.';
        break;
    }
    return throwError(errorMessage);
  }
}
