import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { MyAuthConfig } from './config';
import { FormHelperService } from './form-helper.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main.component';
import { SignInComponent } from './sign.in.component';
import { HeaderComponent } from './header.component';
import { AuthGuardService } from './auth.gard.service'
import { JsonHttpGateway } from './json.http.service';
import { ErrorHandleService } from './error-handle.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    HeaderComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ErrorHandleService,
    FormHelperService,
    AuthGuardService,
    JsonHttpGateway,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
