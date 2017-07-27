import { Component, Input, OnDestroy } from '@angular/core';
import { JwtHttp, AuthService } from 'ng2-ui-auth';
import { ITokenUser } from './interfaces';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { ErrorHandleService } from './error-handle.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: 'views/navigation.html'
})
export class HeaderComponent implements OnDestroy {

  public user: ITokenUser;
  private _userSubscription: Subscription;

  constructor(private http: JwtHttp,
              private router: Router,
              private userService: UserService,
              private eh: ErrorHandleService) {
    this._userSubscription = userService.userChanged$.subscribe(
      user => {
        this.user = user;
    });
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  signOut() {
    this.userService.logout()
    .subscribe({
        error: (err: any) => this.eh.handleError(err),
        complete: () => this.router.navigateByUrl('/signIn')
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._userSubscription.unsubscribe();
  }
}
