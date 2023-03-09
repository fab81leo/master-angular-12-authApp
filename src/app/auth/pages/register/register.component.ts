import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  // ** Configuración de mi Formulario **
  miFormulario: FormGroup = this.fb.group({    
    name:    ['Test 4', [ Validators.required ]],
    // ** el campo email va tener un valor por defecto y 2 validadores **
    // Aunque este validador Validators.email no es el mejor lo vamos a usar solo para continuar,
    // también podríamos usar una expresión regular **
    email:    ['test4@test.com', [ Validators.required, Validators.email ]],
    // ** Validators.minLength(6) => Mínimo 6 caracteres | Validators.min(6) => valor mínimo es 6 **
    password: ['123456', [ Validators.required, Validators.minLength(6) ]]
  });

  // ** Inyectamos FormBuilder ** 
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService ) {}

  registro() {
    
    // console.log( this.miFormulario.value );
    // console.log( this.miFormulario.valid );

    const { name, email, password } = this.miFormulario.value;
    
    // ** Para disparar este servicio necesito subscribirme **
    this.authService.registro( name, email, password )
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
