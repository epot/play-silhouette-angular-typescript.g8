import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PasswordService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  forgotPassword(data: any): Promise<void> {
    return this.http.post('/password/forgot', data)
      .toPromise()
      .then(response => {
          return;
        })
      .catch(this.handleError);
  }

  resetPassword(token: string, data: any): Promise<void> {
    return this.http.post('/password/reset/' + token, data)
      .toPromise()
      .then(response => {
          return;
        })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
