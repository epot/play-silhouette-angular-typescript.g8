import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'ng2-ui-auth';

import { FormHelperService } from '../services/form-helper.service';
import { ErrorHandleService } from '../services/error-handle.service';
import { UserService } from '../services/user.service'

@Component({
    selector: 'my-signup',
    templateUrl: 'templates/sign-up.component.html'
})
export class SignUpComponent implements OnInit {
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
            'firstName': new FormControl('', [Validators.required]),
            'lastName': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required]),
            'avatarUrl': new FormControl('')
        });
    }

    signup(signupData: any) {
        this.auth.signup({
            firstName: signupData['firstName'],
            lastName: signupData['lastName'],
            email: signupData['email'],
            password: signupData['password'],
            avatarurl: signupData['avatarUrl']
        })
            .subscribe({
                next: (response) => {
                    console.log(response);
                    this.auth.setToken(response.token);
                    this.userService.renewUser();
                },
                error: (err: any) => this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('/')
            });
    }
}
