import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
