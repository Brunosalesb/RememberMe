import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.loginService.createAccount(this.loginForm.value.email, this.loginForm.value.senha);
  }

  private initForm() {
    let email = '';
    let senha = '';

    this.loginForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'senha': new FormControl(senha, Validators.required)
    });
  }

}
