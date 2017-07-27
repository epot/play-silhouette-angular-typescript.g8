import 'ng2-toastr/bundles/ng2-toastr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AfterViewChecked, Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ErrorHandleService } from './error-handle.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service'
import { AuthService } from 'ng2-ui-auth';
import { ITokenUser } from './interfaces';

@Component({
  selector: 'my-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Play Silhouette Angular Seed';
  user: ITokenUser;
  _subscription: Subscription;

    constructor(private _vcr: ViewContainerRef,
              private _eh: ErrorHandleService,
              private _toastr: ToastsManager,
              private _auth: AuthService,
              private _userService: UserService) {
    this._eh.setRootViewContainerRef(this._vcr);
  }

  ngOnInit() {

    // Allow toast on click dismiss, see:
    // https://github.com/PointInside/ng2-toastr/issues/61
    this._toastr.onClickToast()
      .subscribe( toast => {
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId);
        }
        this._toastr.dismissToast(toast)
      });
  }

  ngAfterViewChecked() {
    // You can call everywhere ErrorHandleService.saveMessage and .saveError
    // the code here will show them after the next routing happened.
    // This is usefull when you want to show a toastr message/error AFTER a routing.
    this._eh.showSavedMessage();
    this._eh.showSavedError();
  }
}
