import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  toastrNotification(mensagem, titulo) {
    switch (titulo) {
      case "Sucesso":
        this.toastr.success(mensagem, titulo)
        break;
      case "Erro":
        this.toastr.error(mensagem, titulo)
        break;
      case "Aviso":
        this.toastr.warning(mensagem, titulo)
        break;
      case "Info":
        this.toastr.info(mensagem, titulo)
        break;
      default: null;
        break;
    }
  };
}
