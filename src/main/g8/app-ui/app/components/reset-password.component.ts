import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'ng2-ui-auth';

import { FormHelperService } from '../services/form-helper.service';
import { ErrorHandleService } from '../services/error-handle.service';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'my-password-reset',
  templateUrl: 'templates/reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string;

  constructor(private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                public fh: FormHelperService,
                private eh: ErrorHandleService,
                private pwdService: PasswordService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.token = params['token'];
    });
    this.form = this.fb.group({
      'password': new FormControl('', [Validators.required])
    });
  }

  submit(signupData: any) {
    this.pwdService.resetPassword(this.token, {
        password: signupData['password'],
    }).then(response => {
        this.router.navigateByUrl('/');
        this.eh.saveMessage(
          'success',
          'We have reset your password. You can now sign in with your credentials.'
      );
    }
    ).catch(err => {
        this.eh.handleError('Your link is not valid anymore, please get a new one!');
    });
  }
}
