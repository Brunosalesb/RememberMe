import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.onSubmit();
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
