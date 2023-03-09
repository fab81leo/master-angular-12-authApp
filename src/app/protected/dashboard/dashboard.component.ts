import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      /** Estableciendo una separación de 15px para todo el documento HTML */ 
      * { margin: 15px; }
    `
  ]
})
export class DashboardComponent {

  get user() {
    return this.authService.user;
  }

  constructor( 
    private router: Router,
    private authService: AuthService ) {}

  logout() {

    // ** Removemos nuestro token del localStorage **
    this.authService.logout();

    // ** Redireccionamos a la ruta /auth/login **
    this.router.navigateByUrl('/auth');
  }

}
