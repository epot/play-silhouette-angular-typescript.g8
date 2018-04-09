import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'ng2-ui-auth';

import { FormHelperService } from '../services/form-helper.service';
import { ErrorHandleService } from '../services/error-handle.service';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'my-password-forgot',
  templateUrl: 'templates/forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  passwordFieldName = 'password';
  repeatedPasswordFieldName = 'passwordConfirmation';

    constructor(private router: Router,
                private fb: FormBuilder,
                public fh: FormHelperService,
                private eh: ErrorHandleService,
                private pwdService: PasswordService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            'email': new FormControl('', [Validators.required, Validators.email])
        });
    }

    submit(signupData: any) {
        this.pwdService.forgotPassword({
            email: signupData['email'],
        }).then(response => {
            this.router.navigateByUrl('/');
            this.eh.saveMessage(
                'success',
                'We have sent you an email with further instructions to reset your password, on condition that the address \
                was found in our system.If you do not receive an email within the next 5 minutes, then please recheck your \
                entered email address and try it again.'
            );
        }
        ).catch(err => {
            this.eh.handleError(err);
        });
    }
}
