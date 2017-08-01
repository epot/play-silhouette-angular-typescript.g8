import 'ng2-toastr/bundles/ng2-toastr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AfterViewChecked, Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from 'ng2-ui-auth';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../services/user.service';
import { TokenUser } from '../token-user';
import { ErrorHandleService } from '../services/error-handle.service';

@Component({
  selector: 'my-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Play Silhouette Angular Seed';

    constructor(private vcr: ViewContainerRef,
              private eh: ErrorHandleService,
              private toastr: ToastsManager,
              private auth: AuthService,
              private userService: UserService) {
    this.eh.setRootViewContainerRef(this.vcr);
  }

  ngOnInit() {

    // Allow toast on click dismiss, see:
    // https://github.com/PointInside/ng2-toastr/issues/61
    this.toastr.onClickToast()
      .subscribe( toast => {
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId);
        }
        this.toastr.dismissToast(toast)
      });
  }

  ngAfterViewChecked() {
    // You can call everywhere ErrorHandleService.saveMessage and .saveError
    // the code here will show them after the next routing happened.
    // This is usefull when you want to show a toastr message/error AFTER a routing.
    this.eh.showSavedMessage();
    this.eh.showSavedError();
  }
}
