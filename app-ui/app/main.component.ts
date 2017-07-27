import { Component, Input, OnDestroy } from '@angular/core';
import { ITokenUser } from './interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './user.service'

@Component({
  selector: 'my-main',
  templateUrl: 'views/home.html'
})
export class MainComponent implements OnDestroy {
  public user: ITokenUser;
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
