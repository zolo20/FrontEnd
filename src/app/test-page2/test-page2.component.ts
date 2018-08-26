import { Component, OnInit } from '@angular/core';
import {HttpService} from "../common/http.service";

@Component({
  selector: 'app-test-page2',
  templateUrl: './test-page2.component.html',
  styleUrls: ['./test-page2.component.css'],
  providers: [HttpService]

})
export class TestPage2Component implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

}
