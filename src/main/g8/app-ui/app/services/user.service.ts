import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/toPromise';

import { TokenUser } from '../token-user';

@Injectable()
export class UserService {
  public user: TokenUser;
  expiration: Date;
  secret: Observable<Object>;
  userChangedSource = new Subject<TokenUser>();
  userChanged$ = this.userChangedSource.asObservable();

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient) {
      this.renewUser().catch(_ => {
          this.logout().subscribe({
            error: (err: any) => this.handleError(err),
            complete: () => this.router.navigateByUrl('/signIn')
          });
        }
      );
  }

  logout() {
    this.user = null;
    return this.auth.logout();
  }

  renewUser(): Promise<TokenUser> {
    this.expiration = this.auth.getExpirationDate();
    this.secret = this.http.get('/secret').map(response => response);

    return this.http.get('/user')
      .toPromise()
      .then(response => {
          this.user = response as TokenUser;
          this.userChangedSource.next(this.user);
          return this.user;
        })
      .catch(this.handleError);
  }

  isAuthenticated() {
    return this.user && this.auth.isAuthenticated();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}