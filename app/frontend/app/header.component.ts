import { OnInit, Component } from '@angular/core';
import { JwtHttp, AuthService } from 'ng2-ui-auth';
import { ITokenUser } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from './user.service'

@Component({
  selector: 'app-header',
  templateUrl: 'views/navigation.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
    user: ITokenUser;
    expiration: Date;
    secret: Observable<string>;

    constructor(private http: JwtHttp,
                private auth: AuthService,
                private router: Router,
                private userService: UserService,
                public toastr: ToastsManager,
                vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.expiration = this.auth.getExpirationDate();
        this.secret = this.http.get('/secret').map(response => response.text());

        if (this.auth.getPayload()) {
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

    isAuthenticated(): boolean {
      return this.user && this.auth.isAuthenticated();
    }

    signOut() {
        this.auth.logout()
        .subscribe({
                error: (err: any) => this.toastr.error(err.json().message),
                complete: () => this.router.navigateByUrl('/signIn')
            });
    }
}
