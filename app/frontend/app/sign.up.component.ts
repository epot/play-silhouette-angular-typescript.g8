import {Router} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormHelperService} from './form-helper.service';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
/**
 * Created by Ron on 03/10/2016.
 */

@Component({
    selector: 'my-signup',
    templateUrl: 'views/signUp.html',
})
export class SignUpComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService,
                private router: Router,
                private fb: FormBuilder,
                public fh: FormHelperService,
                public toastr: ToastsManager,
                vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.form = this.fb.group({
            'firstName': new FormControl('', [Validators.required]),
            'lastName': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required]),
        })
    }

    signup(signupData: any) {
        this.auth.signup({
            firstName: signupData['firstName'],
            lastName: signupData['lastName'],
            email: signupData['email'],
            password: signupData['password']
        })
            .subscribe({
                next: (response) => {
                    console.log(response.json());
                    this.auth.setToken(response.json().token)
                },
                error: (err: any) => this.toastr.error(err.json().message),
                complete: () => this.router.navigateByUrl('/')
            });
    }
}
