import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';


import { AppRoutingModule, CLIENT_ROUTER_PROVIDERS } from './app-routing.module';
import { TokenInterceptor } from './token-interceptor';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header.component';
import { MainComponent } from './components/main.component';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ErrorHandleService } from './services/error-handle.service';
import { FormHelperService } from './services/form-helper.service';
import { UserService } from './services/user.service';
import { PasswordService } from './services/password.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
    Ng2UiAuthModule.forRoot({
      baseUrl: '/',
      loginUrl: '/signIn',
      signupUrl: '/signUp',
      tokenName: 'token',
      tokenPrefix: 'ng2-ui-auth', // Local Storage name prefix
      authHeader: 'X-Auth-Token',
      storageType: 'cookie' as 'cookie',
      providers: {
          google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              url: '/authenticate/google',
              redirectUri: process.env.REDIRECTURI // passed by the webpack environment specific config files
          }
      }
    }),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    HeaderComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [
    ErrorHandleService,
    FormHelperService,
    CLIENT_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuardService,
    UserService,
    PasswordService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
