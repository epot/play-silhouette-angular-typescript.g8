import { Injectable, ViewContainerRef } from '@angular/core';
import { Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandleService {
  private _savedError: any;
  private _savedSeverity: string;
  private _savedMessage: string;

  constructor(private _toastr: ToastrService) {
  }

  saveMessage(severity: string, message: string) {
    this._savedSeverity = severity;
    this._savedMessage = message;
  }

  showSavedMessage() {
    if (this._savedSeverity === '' || this._savedMessage === '') {
      return;
    }

    if (this._savedSeverity === 'error') {
      this._toastr.error(this._savedMessage);
    } else if (this._savedSeverity === 'warning') {
      this._toastr.warning(this._savedMessage);
    } else if (this._savedSeverity === 'info') {
      this._toastr.info(this._savedMessage);
    } else if (this._savedSeverity === 'success') {
      this._toastr.success(this._savedMessage);
    }

    this._savedSeverity = '';
    this._savedMessage = '';
  }

  saveError(err: any) {
    this._savedError = err;
  }

  showSavedError() {
    if (this._savedError == null) {
      return;
    }

    this.handleError(this._savedError);
    this._savedError = null;
  }

  handleError(err: any) {
      if (typeof err === 'string') {
          this._toastr.error(err);
      } else if (err instanceof Response) { // for ng2-ui-auth errors
        const res: Response = err;
        if (res.json().message) {
            this._toastr.error(res.json().message, res.statusText);
        } else {
            this._toastr.error(res.statusText);
        }
      } else if (err && err['message']) {
          this._toastr.error(err['message']);
      } else if (err && err['errors']) {
          this._toastr.error(err['errors'].join(', '));
      } else if (err) {
          this._toastr.error(err.toString());
      } else {
          this._toastr.error('An unknown error has occurred');
      }
  }
}
