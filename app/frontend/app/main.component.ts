import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { AuthService } from 'ng2-ui-auth';
import { ITokenUser } from './interfaces';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-main',
  templateUrl: 'views/home.html'
})
export class MainComponent implements OnInit {
  user: ITokenUser;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.userService
        .getUser()
        .then(user => {
            this.user = user;
          }
        ).catch(err => {
            this.toastr.error(err.json().message)
        });
  }
}
