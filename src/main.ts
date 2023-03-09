import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// ** Librerias adicionadas **
import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";

// ** Verificando ambiente de producción **
if( environment.production ) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
