import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'ng2-ui-auth';

import { FormHelperService } from '../services/form-helper.service';
import { ErrorHandleService } from '../services/error-handle.service';
import { UserService } from '../services/user.service'
import { LoginData } from '../login-data';

@Component({
    selector: 'my-login',
    templateUrl: 'views/signIn.html',
})
export class SignInComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService,
                private router: Router,
                private fb: FormBuilder,
                public fh: FormHelperService,
                private eh: ErrorHandleService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            rememberMe: new FormControl(true),
        })
    }

    login(loginData: LoginData) {
        this.auth.login(loginData)
            .subscribe({
                error: (err: any) => this.eh.handleError(err),
                complete: () => {
                    this.userService.renewUser();
                    this.router.navigateByUrl('/');
                }
            });
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe({
                error: (err: any) => this.eh.handleError(err),
                complete: () => {
                    this.userService.renewUser();
                    this.router.navigateByUrl('/');
                }
            });
    }
}
