import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';

export const httpTokenInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const tokenEx = inject('httpXsrfTokenExtractor');
  const crstTokenName = 'X-XSRF-TOKEN';

  const crsfToken = tokenEx.getToken() as string;

  if (crsfToken != null && req.headers.has(crstTokenName)) {
    req = req.clone({
      headers: req.headers.set(crstTokenName, crsfToken)
       });

    req = req.clone({
      headers: req.headers.set('Refer', 'http://localhost:4200s')
    });
  }
  return next(req);
};

