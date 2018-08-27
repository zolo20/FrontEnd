import {Injectable} from '@angular/core';
import {Observable, throwError, of} from "rxjs/index";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandler{

  constructor( private router: Router) {
  }

  public handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl("/login");
      return of(err.message);
    }
    return throwError(err);
  }


}
