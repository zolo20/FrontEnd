import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../common/http.service";
import { first } from 'rxjs/operators';
import {Router} from "@angular/router";
import {EMPTY, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../common/User";



@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})
export class EntriesComponent implements OnInit {

  user: User = new User();

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(){
  }

  logIn(login: string, password: string) {
    const request = {
      login: login,
      password: password,
    };
    this.httpService.logIn(request);
  }
}
