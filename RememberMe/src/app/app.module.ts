import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { EventosCadastroComponent } from './pages/eventos/eventos-cadastro/eventos-cadastro.component';
import { EventosService } from './services/eventos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    EventosComponent,
    EventosCadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EventosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
