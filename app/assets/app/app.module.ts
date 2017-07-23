import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { MyAuthConfig } from './config';
import { FormHelperService } from './form-helper.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CLIENT_ROUTER_PROVIDERS } from './app-routing.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main.component';
import { SignInComponent } from './sign.in.component';
import { HeaderComponent } from './header.component';
import { AuthGuardService } from './auth.guard.service'
import { JsonHttpGateway } from './json.http.service';
import { ErrorHandleService } from './error-handle.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    ToastModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    HeaderComponent,
  ],
  providers: [
    ErrorHandleService,
    FormHelperService,
    CLIENT_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuardService,
    JsonHttpGateway,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
