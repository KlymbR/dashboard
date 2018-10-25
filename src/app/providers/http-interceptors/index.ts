// #docplaster
// #docregion interceptor-providers
/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// #enddocregion interceptor-providers
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';


// #docregion interceptor-providers

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [

  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },

  // #docregion interceptor-providers
];
// #enddocregion interceptor-providers
