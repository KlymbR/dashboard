import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent as RoomsPage } from './pages/rooms/rooms.page';
import { RoomComponent as RoomPage } from './pages/room/room.page';
import { WayComponent as WayPage } from './pages/way/way.page';

const routes: Routes = [
  { path: '', component: RoomsPage },
  { path: ':room', component: RoomPage },
  { path: ':room/:way', component: WayPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
