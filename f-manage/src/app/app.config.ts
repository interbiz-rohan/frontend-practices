import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './configs/indexed-db.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))

  ]
};
