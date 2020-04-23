import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { map, subscribeOn } from "rxjs/operators";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  loadingSpinner = false;
  eventos: any;
  usuarioLogado: any;

  constructor(private eventoService: EventosService) { }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('userData'));
    this.obterTodos();
  }

  obterTodos() {
    this.loadingSpinner = true;
    this.eventoService.get(this.usuarioLogado.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(eventos => {
      if (eventos.length != 0) {
        this.eventos = eventos;
      } else {
        this.eventos = null;
      }
      this.loadingSpinner = false;
      this.eventoService.gravarEventos(eventos);
    });
  }

  deletar(key: string) {
    this.eventoService.delete(key)
      .catch(err => console.log(err));
  }
}
