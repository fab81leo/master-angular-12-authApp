import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ** Guards Creados **
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

  // ** Carga de módulos mediante LAZY LOAD **
  {
    // ** Implementando LAZY LOAD (carga perezosa) **
    path: 'auth',
    // ** .then porque es una PROMESA | Cargamos el módulo de Autenticación **
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    // ** Implementando LAZY LOAD (carga perezosa) **
    path: 'dashboard',
    // ** .then porque es una PROMESA | Cargamos el módulo de Autenticación **
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    // ** Pasamos todos los Guards para validar si puede cargar este modulo o no [dashboard] **
    canActivate: [ ValidarTokenGuard],
    canLoad: [ ValidarTokenGuard]
  },
  {
    // ** Para cualquier otra ruta diferente a /auth o /dashboard | redirigimos a /auth **
    path: '**',
    redirectTo: 'auth'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
