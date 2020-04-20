import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private urlBase = '/usuarios';
  private usuario: Usuario;

  usuarioRef: AngularFirestoreCollection = null;

  constructor(private db: AngularFirestore) {
    this.usuarioRef = db.collection(this.urlBase);
  }

  cadastrarUsuario(nome: string, sobrenome: string, email: string): void {
    this.usuarioRef.add({nome, sobrenome, email});
  }
}
