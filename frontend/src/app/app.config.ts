import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { httpTokenInterceptorInterceptor } from './auth/http-token-interceptor.interceptor';
import { errInteInterceptor } from './_/helper/err-inte.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'Xsrf-Headers' }),
  withInterceptors([errInteInterceptor,httpTokenInterceptorInterceptor])),
  ]
};