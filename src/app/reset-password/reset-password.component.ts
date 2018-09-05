import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {User} from "../common/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../common/constants";
import {HttpService} from "../common/http.service";
import {of} from "rxjs/index";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: User = new User();
  hide: boolean;
  showErrPass: boolean;
  showErrConfPass: boolean;
  press: boolean;
  displayErr: boolean = false;
  displayGood: boolean = false;

  constructor(private eref: ElementRef, private activatedRoute: ActivatedRoute,private httpService: HttpService , private router: Router) {
  }

  ngOnInit() {
    localStorage.setItem("token_reset_password", this.activatedRoute.snapshot.url[1].path);
    this.httpService.testTokenExpiration().subscribe(resp => {
      this.displayGood = true;
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.displayErr=true;
      }
    });
    console.log(this.activatedRoute.snapshot.url[1].path);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.hide = this.eref.nativeElement.contains(event.target);
  }

  clickPassword() {
    this.showErrPass = true;
    this.showErrConfPass = false;
  }

  clickConfPassword() {
    this.showErrPass = false;
    this.showErrConfPass = true;
  }

  resetPassword(password:string) {
    const request = {
      password: password,
    };
    this.httpService.putPassword(request);
  }

  route(){
    localStorage.removeItem("token_reset_password");
    this.router.navigateByUrl("/home");
  }
}
