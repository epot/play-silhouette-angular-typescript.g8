import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from 'ng2-ui-auth';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
      public auth: AuthService,
      private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
        request = request.clone({
            setHeaders: {
                'X-Auth-Token': this.auth.getToken()
            }
        });
    }

    // Add CSRF token for the Play CSRF filter
    const token = this.cookieService.get('PLAY_CSRF_TOKEN');
    if (token) {
        // Play looks for a token with the name Csrf-Token
        // https://www.playframework.com/documentation/2.4.x/ScalaCsrf
        request = request.clone({
            setHeaders: {
                'Csrf-Token': token
            }
        });
    }

    return next.handle(request);
  }
}
