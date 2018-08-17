import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routes';

import { AppService } from './app.service';

import {
  MatButtonModule
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
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [AppService],
  bootstrap: [AppPage]
})
export class AppModule { }
