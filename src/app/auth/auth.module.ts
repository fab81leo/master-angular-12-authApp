// ** Módulos de Angular **
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// ** Módulos creados **
import { AuthRoutingModule } from './auth-routing.module';
// ** Componentes **
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
