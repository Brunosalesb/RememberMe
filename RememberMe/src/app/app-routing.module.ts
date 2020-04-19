import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { EventosCadastroComponent } from './pages/eventos/eventos-cadastro/eventos-cadastro.component';


const routes: Routes = [
  { path: '', redirectTo: '/eventos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'eventos', children: [
      {
        path: '',
        component: EventosComponent
      },
      {
        path: 'cadastro',
        component: EventosCadastroComponent
      },
      {
        path: 'cadastro/:key',
        component: EventosCadastroComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
