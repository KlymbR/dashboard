import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routes';

// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
import { httpInterceptorProviders } from './providers/http-interceptors/index';

import {
  MatButtonModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent as AppPage } from './pages/app/app.page';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackgroundComponent } from './components/background/background.component';

/*
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
]);

export function provideConfig() {
  return config;
}
*/

@NgModule({
  declarations: [
    AppPage,
    HeaderComponent,
    FooterComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    // SocialLoginModule
  ],
  providers: [
    CookieService,
    AppService,
    /* {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, */
    httpInterceptorProviders
  ],
  bootstrap: [AppPage]
})
export class AppModule { }
