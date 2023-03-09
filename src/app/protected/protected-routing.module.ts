import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {
    // ** Ruta o path que me define el sistema de rutas padre **
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      // ** Cualquier otro path o ruta 
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
