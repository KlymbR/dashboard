import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account.routes';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

import { AccountComponent as AccountPage } from './pages/account/account.page';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  declarations: [
    AccountPage,
    DialogDeleteComponent
  ],
  entryComponents: [DialogDeleteComponent]
})
export class AccountModule { }
