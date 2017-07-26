import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ITokenUser } from './interfaces';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getUser(): Promise<ITokenUser> {
    return this.http.get('/user')
              .toPromise()
              .then(response => {
                  return response as ITokenUser;
                })
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
