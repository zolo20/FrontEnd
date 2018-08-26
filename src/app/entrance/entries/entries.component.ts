import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../common/http.service";
import { first } from 'rxjs/operators';
import {Router} from "@angular/router";
import {EMPTY, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";



@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  providers: [HttpService]

})
export class EntriesComponent implements OnInit {

  _login: any;
  _password: any;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(){
    console.log('hi')
  }

  logIn(login: string, password: string) {
    this.httpService.logIn(login, password).subscribe();
  }
}
