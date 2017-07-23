import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { SignInComponent } from './sign.in.component';
import { AuthGuardService } from './auth.guard.service';

export const CLIENT_ROUTER_PROVIDERS = [
    AuthGuardService
];

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signIn', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
