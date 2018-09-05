import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {HttpService} from "../../common/http.service";
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {User} from "../../common/User";


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})
export class EntriesComponent implements OnInit {

  user: User = new User();
  display: boolean = false;
  @Output() active: EventEmitter<any> = new EventEmitter();


  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  logIn(email: string, password: string) {
    const request = {
      email: email,
      password: password,
    };
    this.httpService.logIn(request);
  }

  showDialog() {
    this.display = true;
    this.active.emit(this.display);
  }
}
