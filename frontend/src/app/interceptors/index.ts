import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CsrfInterceptor } from './csrf.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
];
