import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { ILoginData } from './interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormHelperService } from './form-helper.service';

/**
 * Created by Ron on 03/10/2016.
 */

@Component({
    selector: 'my-login',
    templateUrl: 'views/signIn.html',
})
export class SignInComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService,
                private router: Router,
                private fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    login(loginData: ILoginData) {
        this.auth.login(loginData)
            .subscribe({
                error: (err: any) => console.error(err), // this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('main')
            });
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe({
                error: (err: any) => console.error(err), // this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('main')
            });
    }
}
