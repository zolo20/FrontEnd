import {EventEmitter, Injectable} from '@angular/core';
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
      {headers: {'Content-Type': 'application/json'}, observe: "response"});
  }

  logIn(request: any) {
    return this
      .http.post(Constants.LOG_IN_URL, JSON.stringify(request), {observe: 'response'})
      .subscribe(resp => {
        localStorage.setItem("token", resp.headers.get(Constants.TOKEN_NAME));
        this.router.navigateByUrl("/app");
      }, err => {
        this.errHandler.handleAuthError(err);
      })
  };

  sendEmail(request: any) {
    return this
      .http.post(Constants.SEND_EMAIL_URL, JSON.stringify(request), {
        headers: {'Content-Type': 'application/json'},
        observe: 'response'
      });
  }

  joinFacebook() {
    return this.http.get(Constants.FB_URL);
  }

  testTokenExpiration() {
    return this.http.get(Constants.TEST_URL);
  }

  putPassword(request: any) {
    this.http.put(Constants.RESET_PASSWORD_URL, request, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response'
    }).subscribe(res=>{
      console.log("successful");
      this.router.navigateByUrl("/home");
    },err => {
      this.router.navigateByUrl("/home");
    });
  }

  static getToken(): string {
    return localStorage.getItem("token");
  }

  static getTokenResetPassword(): string {
    return localStorage.getItem("token_reset_password");
  }
}
