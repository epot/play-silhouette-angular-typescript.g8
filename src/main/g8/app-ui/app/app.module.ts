import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CookieModule } from 'ngx-cookie';


import { AppRoutingModule, CLIENT_ROUTER_PROVIDERS } from './app-routing.module';
import { MyAuthConfig } from './config';
import { TokenInterceptor } from './token-interceptor';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header.component';
import { MainComponent } from './components/main.component';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { AuthGuardService } from './services/auth-guard.service'
import { ErrorHandleService } from './services/error-handle.service';
import { FormHelperService } from './services/form-helper.service';
import { JsonHttpGateway } from './services/json-http.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    ToastModule.forRoot(),
    CookieModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    HeaderComponent,
    SignUpComponent,
  ],
  providers: [
    ErrorHandleService,
    FormHelperService,
    CLIENT_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuardService,
    JsonHttpGateway,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
