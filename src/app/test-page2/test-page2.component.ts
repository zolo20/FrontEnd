import { Component, OnInit } from '@angular/core';
import {HttpService} from "../common/http.service";
import {Router} from "@angular/router";
import {ErrorHandler} from "../common/error-handler";

@Component({
  selector: 'app-test-page2',
  templateUrl: './test-page2.component.html',
  styleUrls: ['./test-page2.component.css'],
})
export class TestPage2Component implements OnInit {

  constructor(private httpService: HttpService, private router: Router,private errHandler: ErrorHandler) { }

  ngOnInit() {
    this.httpService.testTokenExpiration().subscribe(resp => {
    }, err => {
      this.errHandler.handleAuthError(err);
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/home");
  }
}
