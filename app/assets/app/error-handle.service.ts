import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandleService {

    handleError(toastr: ToastsManager, err: any) {
        if (typeof err === 'string') {
            toastr.error(err);
        } else if (err instanceof Response) {
            const res: Response = err;
            if (res.text() && res.text() !== res.statusText) {
                toastr.error(res.text(), res.statusText);
            } else {
                toastr.error(res.statusText);
            }
        } else if (err && err.message) {
            toastr.error('Login failed', err.message);
        } else if (err) {
            toastr.error('Login failed', err.toString());
        } else {
            toastr.error('An unknown error has occurred');
        }
    }
}
