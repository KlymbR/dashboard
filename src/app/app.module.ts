import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import {
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatTableModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DialogSigninComponent } from './dialog-signin/dialog-signin.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SocialComponent } from './social/social.component';
import { AccountComponent } from './account/account.component';
import { AppRoutingModule } from './app.routes';
import { WaysComponent } from './ways/ways.component';
import { GripsComponent } from './grips/grips.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './user.service';
import { ClimbService } from './climb.service';


@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    HomeComponent,
    LoginComponent,
    ForgotComponent,
    DialogSigninComponent,
    FooterComponent,
    SocialComponent,
    AccountComponent,
    WaysComponent,
    GripsComponent,
    UsersComponent
  ],
  entryComponents: [DialogSigninComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTableModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => {
        const config = new AuthServiceConfig([{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        }, {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('Your-Google-Client-Id')
        }]);
        return config;
      }
    },
    MediaMatcher,
    CookieService,
    AuthService,
    UserService,
    ClimbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
