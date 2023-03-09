import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth';
import { User } from '../interfaces/user';

@Injectable({
  // ** Indicamos que el servicio es GENERAL en mi aplicación | No requiere incluirse en ningún modulo **
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  // ** ! => Tranquilo TypeScript yo se lo que estoy haciendo **
  private _user!: User;

  constructor( private http: HttpClient) { }

  get user() {
    // Aplicamos desestructuración para evitar que en alguna parte de mi aplicación se manipule el usuario **
    return {...this._user};
  }

  registro( name: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/auth/new`;
    // ** El orden como enviamos estos atributos en el objeto es indiferente **
    const body = { email, password, name };
    return this.http.post<AuthResponse>( url, body)
      // ** Necesitamos hacer la mutación de la data | retornar true si la data esta bien o false
      // si existe algún error en las credenciales de autenticación **
      
      // ------------------------------------------------------------------------------------
      // ** Como el código es muy similar al de LOGIN, podríamos crear un PIPE PERSONALIZADO 
      // para ejecutar este código **
      // ------------------------------------------------------------------------------------
      .pipe(
        // ** La ejecución de los operadores es SECUENCIAL | Se ejecutan en el orden de aparición **
        // ** tap() => Ejecutar algun código antes de pasar a los siguientes 
        // operadores => map(), catchError(), etc... **
        // tap( resp => {
          // ** Aplicando DESESTRUCTURACIÓN **
          tap( ({ok, token} ) => {  
          // console.log( resp );
            console.log( ok );
          // if (resp.ok) {
            if (ok) {  
              // ** Guardamos nuestro token en el localStorage | ! => Indicamos que siempre viene **
              // localStorage.setItem('token', resp.token! );
              localStorage.setItem('token', token! );
              // ------------------------------------------------------------------------
              // ** Establecer el objeto usuario no va ser responsabilidad de este método
              // ------------------------------------------------------------------------
            }
        }),
        // ** Retorna un boolean cuando alguien se subscriba a este Observable **
        map( valid => valid.ok),
        // ** Atrapar el error Bad Request : 400 para retornar un Observable<false> **
        // catchError( err => of(false) )
        // ** Solo necesitamos devolver el mensaje del error **
        catchError( err => of(err.error.msg) )
      );
  }

  login( email:string, password: string ) {
    
    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>( url, body)
      // ** Necesitamos hacer la mutación de la data | retornar true si la data esta bien o false
      // si existe algún error en las credenciales de autenticación **
      .pipe(
        // ** La ejecución de los operadores es SECUENCIAL | Se ejecutan en el orden de aparición **
        // ** tap() => Ejecutar algun código antes de pasar a los siguientes 
        // operadores => map(), catchError(), etc... **
        tap( resp => {
          console.log( resp );
          if (resp.ok) {

            // ** Guardamos nuestro token en el localStorage | ! => Indicamos que siempre viene **
            localStorage.setItem('token', resp.token! );
            // ------------------------------------------------------------------------
            // ** Establecer el objeto usuario no va ser responsabilidad de este método
            // ------------------------------------------------------------------------
          }
        }),
        // ** Retorna un boolean cuando alguien se subscriba a este Observable **
        map( valid => valid.ok),
        // ** Atrapar el error Bad Request : 400 para retornar un Observable<false> **
        // catchError( err => of(false) )
        // ** Solo necesitamos devolver el mensaje del error **
        catchError( err => of(err.error.msg) )
      );

  }

  validarToken(): Observable<boolean> {

    // ** endpoint **
    const url  = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      // ** Evalua si existe un token en el localStorage de lo contrario retorna '' **
      .set('x-token', localStorage.getItem('token') || '' );

    // return this.http.get( url, { headers: headers } );
    // ** Como usamos la misma variable lo podemos dejar así **
    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          console.log( resp.token );  
          // ** Guardamos nuestro token en el localStorage | ! => Indicamos que siempre viene **
          localStorage.setItem('token', resp.token! );

          this._user = {
            // ** ! => Ya hicimos la verificación TypeScript, confía en mi **
            uid: resp.uid!,
            name: resp.name!,
            email: resp.email!
          }

          return resp.ok; 
        }),
        catchError( err => of(false)) 
      );
    
  }

  logout() {
    // ** Podríamos usar el método clear() pero esto eliminaria todo lo que se encuentre en el 
    // localStorage **
    // localStorage.clear()

    // ** Solo remover el atributo token **
    localStorage.removeItem('token');
    
  }

}