import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { EventosCadastroComponent } from './pages/eventos/eventos-cadastro/eventos-cadastro.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './shared/utils/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'eventos', canActivate: [AuthGuard], children: [
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
