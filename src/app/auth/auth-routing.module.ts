import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [

  {
    // ** path vacío que me da el sistema de rutas principal [app-routing.module.ts ] **
    path: '',
    // ** Cuando alguien ingrese al /auth de la ruta principal, siempre vamos a 
    // mostrar el MainComponent **
    component: MainComponent,
    children: [
      //{path: '', component: LoginComponent}, // también podría ser vacío si lo quisieramos
      {path: 'login', component: LoginComponent},
      {path: 'registro', component: RegisterComponent},
      // ** Cualquier otra ruta | vamos a login **
      {path: '**', redirectTo: 'login'}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
