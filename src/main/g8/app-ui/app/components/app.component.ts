import { AfterViewChecked, Component, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ErrorHandleService } from '../services/error-handle.service';

@Component({
  selector: 'my-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewChecked {
  title = 'Play Silhouette Angular Typescript Seed';

    constructor(private eh: ErrorHandleService) {
  }

  ngAfterViewChecked() {
    // You can call everywhere ErrorHandleService.saveMessage and .saveError
    // the code here will show them after the next routing happened.
    // This is usefull when you want to show a toastr message/error AFTER a routing.
    this.eh.showSavedMessage();
    this.eh.showSavedError();
  }
}
