import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routes';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule
} from '@angular/material';

import { AccountComponent as AccountPage } from './pages/account/account.page';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  declarations: [AccountPage]
})
export class AccountModule { }
