import { Component, OnInit } from '@angular/core';
import {HttpService} from "../common/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-page2',
  templateUrl: './test-page2.component.html',
  styleUrls: ['./test-page2.component.css'],
})
export class TestPage2Component implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.req();
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigateByUrl("/home");
  }
}
