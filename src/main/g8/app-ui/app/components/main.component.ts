import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../services/user.service'
import { TokenUser } from '../token-user';

@Component({
  selector: 'my-main',
  templateUrl: 'templates/main.component.html'
})
export class MainComponent implements OnDestroy {
  public user: TokenUser;
  private _userSubscription: Subscription;

  constructor(private userService: UserService) {
    this._userSubscription = userService.userChanged$.subscribe(
      user => {
        this.user = user;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._userSubscription.unsubscribe();
  }
}
