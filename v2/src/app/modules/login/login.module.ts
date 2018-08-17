import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routes';

import { LoginService } from './login.service';

import {
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatProgressBarModule
} from '@angular/material';

import { LoginComponent as LoginPage } from './pages/login/login.page';

import { SocialComponent } from './components/social/social.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  declarations: [
    LoginPage,
    SocialComponent,
    SubscribeComponent,
    RecoveryComponent,
    SigninComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }
