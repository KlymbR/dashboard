import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', loadChildren: '@login/login.module#LoginModule' },
  { path: 'account', loadChildren: '@account/account.module#AccountModule', canActivate: [LoginGuard] },
  { path: 'administration', loadChildren: '@administration/administration.module#AdministrationModule', canActivate: [LoginGuard] },
  { path: 'rooms', loadChildren: '@room/room.module#RoomModule', canActivate: [LoginGuard] },
  { path: '', redirectTo: 'rooms', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
