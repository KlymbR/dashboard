import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room.routes';


import {
  MatCardModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

import { RoomsComponent as RoomsPage } from './pages/rooms/rooms.page';
import { RoomComponent as RoomPage } from './pages/room/room.page';
import { WayComponent as WayPage } from './pages/way/way.page';

@NgModule({
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  declarations: [
    RoomsPage,
    RoomPage,
    WayPage
  ]
})
export class RoomModule { }
