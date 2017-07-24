import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { SignInComponent } from './sign.in.component';
import { AuthGuardService } from './auth.guard.service';
import { SignUpComponent } from './sign.up.component';

export const CLIENT_ROUTER_PROVIDERS = [
    AuthGuardService
];

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuardService] },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
