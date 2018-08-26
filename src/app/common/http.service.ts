import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from "./constants";
import {EMPTY, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Injectable()
export class HttpService {

  headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'

  });

  constructor(private http: HttpClient, private router: Router) {
  }

  // http://localhost:8080/ncedu/task9       NCEdu.Server.JAVA
  signUp(data: any) {
    return this.http.post(Constants.SIGN_UP_URL, data, {observe: 'response'});
  }

  logIn(login: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(
      Constants.LOG_IN_URL,
      JSON.stringify({login: login, password: password}),
      {observe: 'response'})
      .pipe(
        map(resp => {
          localStorage.setItem('access_token', resp.headers.get(Constants.TOKEN_NAME));
          localStorage.setItem('role', resp.headers.get(Constants.ROLE));
          return true;
        })
      )
  };

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
