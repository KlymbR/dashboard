import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AdministrationGuard } from './guards/administration.guard';

const routes: Routes = [
  { path: 'login', loadChildren: '@login/login.module#LoginModule' },
  { path: 'account', loadChildren: '@account/account.module#AccountModule', canActivate: [LoginGuard] },
  {
    path: 'administration',
    loadChildren: '@administration/administration.module#AdministrationModule',
    canActivate: [
      LoginGuard,
      AdministrationGuard
    ]
  },
  { path: 'rooms', loadChildren: '@room/room.module#RoomModule', canActivate: [LoginGuard] },
  { path: '', loadChildren: '@showcase/showcase.module#ShowcaseModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
