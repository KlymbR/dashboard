import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routes';

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
    MatSnackBarModule
  ],
  providers: [
    CookieService,
    AppService,
    httpInterceptorProviders
  ],
  bootstrap: [AppPage]
})
export class AppModule { }
