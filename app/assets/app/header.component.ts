import { OnInit, Component } from '@angular/core';
import { JwtHttp, AuthService } from 'ng2-ui-auth';
import { ITokenUser } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


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
                private router: Router) {

    }

    ngOnInit() {
        this.user = this.auth.getPayload();
        this.expiration = this.auth.getExpirationDate();
        this.secret = this.http.get('/secret').map(response => response.text());
    }

    isAuthenticated(): boolean {
      return this.auth.isAuthenticated();
    }
}
