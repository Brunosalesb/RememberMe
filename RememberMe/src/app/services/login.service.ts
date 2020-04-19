import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  

  createAccount(email: string, senha: string) {
    firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    })
  }
}
