import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

// ** Servicios **
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  
  // ** Configuración de mi Formulario **
  miFormulario: FormGroup = this.fb.group({
    // ** el campo email va tener un valor por defecto y 2 validadores **
    // Aunque este validador Validators.email no es el mejor lo vamos a usar solo para continuar,
    // también podríamos usar una expresión regular **
    email:    ['test1@test.com', [ Validators.required, Validators.email ]],
    // ** Validators.minLength(6) => Mínimo 6 caracteres | Validators.min(6) => valor mínimo es 6 **
    password: ['123456', [ Validators.required, Validators.minLength(6) ]]
  });

  // ** Inyectamos FormBuilder ** 
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService ) {}

  login() {
    
    // console.log( this.miFormulario.value );
    // console.log( this.miFormulario.valid );

    const { email, password } = this.miFormulario.value;
    
    // ** Para disparar este servicio necesito subscribirme **
    this.authService.login( email, password )
      .subscribe( valid => {
        console.log( valid );
        // *** Se verifica así porque valid puede retornar true pero también un string **
        if (valid === true) {
          // ** Redireccionando al dashboard **
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valid, 'error');
        }
      });    
     
  }

}