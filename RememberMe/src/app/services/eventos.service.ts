import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private urlBase = '/eventos';
  private eventos: Evento[] = [];

  eventoRef: AngularFirestoreCollection<Evento> = null;

  constructor(private db: AngularFirestore) {
    this.eventoRef = db.collection(this.urlBase);
  }
  get(): AngularFirestoreCollection<Evento> {
    return this.eventoRef;
  }

  getByKey(key: string) {
    let eventoFiltrado;
    for (let i = 0; i < this.eventos.length; i++) {
      if (this.eventos[i].key === key) {
        eventoFiltrado = this.eventos[i];
        break;
      }
    }
    return eventoFiltrado;
  }

  create(evento: Evento): void {
    this.eventoRef.add({ ...evento });
  }

  update(key: string, evento: any): Promise<void> {
    return this.eventoRef.doc(key).update(evento);
  }

  delete(key: string): Promise<void> {
    return this.eventoRef.doc(key).delete();
  }

  gravarEventos(eventos: Evento[]) {
    this.eventos = eventos;
  }
}
