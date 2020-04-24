import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { EventosComponent } from '../eventos/eventos.component';
import { Evento } from 'src/app/models/evento';
import { ToastrNotificationService } from 'src/app/shared/notifications/toastr-notification.service';

@Component({
  selector: 'app-eventos-cadastro',
  templateUrl: './eventos-cadastro.component.html',
  styleUrls: ['./eventos-cadastro.component.css']
})
export class EventosCadastroComponent implements OnInit {
  key: string;
  usuarioLogado: any;
  editMode = false;
  eventoForm: FormGroup;
  private evento: Evento;

  constructor(private eventoService: EventosService, private route: ActivatedRoute, private router: Router, private toastrNotification: ToastrNotificationService) { }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('userData'));
    this.route.params
      .subscribe(
        (params: Params) => {
          this.key = params['key'];
          this.editMode = params['key'] != null;
          this.initForm();
        }
      )
  }

  onSubmit() {
    if (this.editMode) {
      this.eventoService.update(this.key, this.eventoForm.value)
      this.toastrNotification.toastrNotification('Evento atualizado com sucesso', 'Sucesso');
    } else {
      this.eventoService.create(this.eventoForm.value, this.usuarioLogado.id);
      this.toastrNotification.toastrNotification('Evento cadastrado com sucesso', 'Sucesso');
    }
    this.router.navigate(['/eventos'], { relativeTo: this.route });
  }

  private initForm() {
    let titulo = '';
    let assunto = '';
    let descricao = '';
    let data = null;

    if (this.editMode) {
      this.evento = this.eventoService.getById(this.key);
      titulo = this.evento.titulo;
      assunto = this.evento.assunto;
      descricao = this.evento.descricao;
      data = this.evento.data;
    }

    this.eventoForm = new FormGroup({
      'titulo': new FormControl(titulo, Validators.required),
      'assunto': new FormControl(assunto),
      'descricao': new FormControl(descricao, Validators.required),
      'data': new FormControl(data, Validators.required),
    });
  }
}
