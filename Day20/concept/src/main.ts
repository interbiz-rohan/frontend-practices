import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HttpRequestInterceptor } from './app/interceptors/http.interceptor';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([HttpRequestInterceptor])
    ),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
