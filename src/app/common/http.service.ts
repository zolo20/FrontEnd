import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from "./constants";
import {Router} from "@angular/router";
import {ErrorHandler} from "./error-handler";
import {Events} from './Events';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private router: Router, private errHandler: ErrorHandler) {
  }

  signUp(request: any) {
    return this.http.post(Constants.SIGN_UP_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe: "response"});
  }

  logIn(request: any) {
    this.http.post(Constants.LOG_IN_URL, JSON.stringify(request), {observe: 'response'})
      .subscribe(resp => {
        localStorage.setItem("token", resp.headers.get(Constants.TOKEN_NAME));
        this.router.navigateByUrl("/app");
      }, err => {
        this.errHandler.handleAuthError(err);
      })
  };

  getEvents(){
    return this.http.get(Constants.GET_VERIFY_EVENTS_URL)
      .toPromise()
      .then(res => <Events[]> res)
      .then(data => { return data; });
  }

  putStatusEvent(request: any){
    return this.http.put(Constants.UPDATE_STATUS_EVENTS_URL, JSON.stringify(request), {
      headers: {'Content-Type': 'application/json'},
      observe: 'response'
    });
  }

  addEvent(request: any) {
    return this.http.post(Constants.ADD_EVENTS_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe: "response"});
  }

  sendEmail(request: any) {
    return this
      .http.post(Constants.SEND_EMAIL_URL, JSON.stringify(request), {
        headers: {'Content-Type': 'application/json'},
        observe: 'response'
      });
  }

  testTokenExpiration() {
    return this.http.get(Constants.TEST_URL);
  }

  putPassword(request: any) {
    this.http.put(Constants.RESET_PASSWORD_URL, JSON.stringify(request), {
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
