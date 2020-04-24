import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrNotificationService } from 'src/app/shared/notifications/toastr-notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loadingSpinner = false;
  authForm: FormGroup;
  loginMode = true;
  formErros: any = [];

  constructor(private authService: AuthService, private usuariosService: UsuariosService, private router: Router, private toastrNotification: ToastrNotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  alterarOperacao() {
    this.loginMode = !this.loginMode;
    this.initForm();
  }

  getFormValidationErrors() {
    const errorsRes = [];
    Object.keys(this.authForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.authForm.get(key).errors;
      if (controlErrors != null) {
        errorsRes.push(key);
      }
    });
    this.formErros = errorsRes;
    alert('Insira um valor válido nos campos: ' + this.formErros)
  }

  onSubmit() {
    if (!this.authForm.valid) {
      this.getFormValidationErrors();
      return;
    }
    const nome = this.authForm.value.nome;
    const sobrenome = this.authForm.value.sobrenome;
    const email = this.authForm.value.email;
    const senha = this.authForm.value.senha;

    let authObs: Observable<AuthResponseData>;

    this.loadingSpinner = true;

    if (this.loginMode) {
      authObs = this.authService.login(email, senha);
    } else {
      authObs = this.authService.criarConta(email, senha, nome, sobrenome);
      this.usuariosService.cadastrarUsuario(nome, sobrenome, email);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.loadingSpinner = false;
        this.router.navigate(['/eventos']);
      },
      errorMessage => {
        this.toastrNotification.toastrNotification(errorMessage, 'Erro');
        this.loadingSpinner = false;
      }
    );

    this.authForm.reset();
  }

  private initForm() {
    let nome = '';
    let sobrenome = '';
    let email = '';
    let senha = '';

    if (!this.loginMode) {
      this.authForm = new FormGroup({
        'nome': new FormControl(nome, Validators.required),
        'sobrenome': new FormControl(sobrenome, Validators.required),
        'email': new FormControl(email, [Validators.required, Validators.email]),
        'senha': new FormControl(senha, [Validators.required, Validators.minLength(6)]),
      });
    }
    else {
      this.authForm = new FormGroup({
        'email': new FormControl(email, [Validators.required, Validators.email]),
        'senha': new FormControl(senha, [Validators.required, Validators.minLength(6)]),
      });
    }
  }
}
