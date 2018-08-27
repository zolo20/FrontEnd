import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from "./constants";
import {Router} from "@angular/router";
import {ErrorHandler} from "./error-handler";

@Injectable()
export class HttpService {



  constructor(private http: HttpClient, private router: Router, private errHandler: ErrorHandler) {
  }

  signUp(request: any) {
    return this.http.post(Constants.SIGN_UP_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe:"response"});
  }

  logIn(request: any) {
    return this
      .http.post(Constants.LOG_IN_URL, JSON.stringify(request),{observe: 'response'})
      .subscribe(resp => {
        this.router.navigateByUrl("/app");
        localStorage.setItem("token",resp.headers.get("Authorization"));
        localStorage.setItem("role",resp.headers.get("Role"));
      }, err => {
          this.errHandler.handleAuthError(err);
      })
  };

  req() {
    this.http
      .get(Constants.TEST_URL).subscribe(resp => {
    }, err => {
      this.errHandler.handleAuthError(err);
    });
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  getRole(): string {
    return localStorage.getItem("role");
  }
}
