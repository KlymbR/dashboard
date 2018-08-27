import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { ShowcaseRoutingModule } from './showcase.routes';

import { ShowcaseService } from './showcase.service';

import { ShowcaseComponent as ShowcasePage } from './pages/showcase/showcase.page';

@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [ShowcasePage],
  providers: [ShowcaseService]
})
export class ShowcaseModule { }
