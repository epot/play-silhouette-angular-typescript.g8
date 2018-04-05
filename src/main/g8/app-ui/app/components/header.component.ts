import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { Subscription } from 'rxjs/Subscription';

import { TokenUser } from '../token-user';
import { UserService } from '../services/user.service'
import { ErrorHandleService } from '../services/error-handle.service';

@Component({
  selector: 'app-header',
  templateUrl: 'templates/header.component.html'
})
export class HeaderComponent implements OnDestroy {

  public user: TokenUser;
  private userSubscription: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private eh: ErrorHandleService) {
    this.userSubscription = userService.userChanged$.subscribe(
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
    this.userSubscription.unsubscribe();
  }
}
