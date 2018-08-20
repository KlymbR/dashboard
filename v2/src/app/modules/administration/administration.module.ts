import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration.routes';

import {
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatProgressBarModule
} from '@angular/material';

import { AdministrationComponent as AdministrationPage } from './pages/administration/administration.page';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule
  ],
  declarations: [
    AdministrationPage,
    UsersComponent
  ]
})
export class AdministrationModule { }
