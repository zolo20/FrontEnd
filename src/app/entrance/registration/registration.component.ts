import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import {User} from "../../common/User";
import {HttpService} from "../../common/http.service";
import {Constants} from "../../common/constants";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  hide: boolean;
  showErrFirst: boolean;
  showErrLast: boolean;
  showErrMail: boolean;
  showErrPass: boolean;
  showErrConfPass: boolean;
  reqStr:any;
  isExist: boolean;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.hide = this.eref.nativeElement.contains(event.target);
  }

  constructor( private httpService: HttpService, private eref: ElementRef) {}

  ngOnInit() {
  }


  clickFirst(){
    this.showErrFirst = true;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = false;
  }

  clickLast(){
    this.showErrFirst = false;
    this.showErrLast = true;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = false;
  }

  clickMail() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = true;
    this.showErrPass = false;
    this.showErrConfPass = false;
    this.isExist = false;
  }

  clickPassword() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = true;
    this.showErrConfPass = false;
  }

  clickConfPassword() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = true;
  }

  registration(email: string, password: string, name: string, surname: string) {
    const request = {
      email: email,
      password: password,
      name: name,
      surname: surname
    };
    this.httpService.signUp(request).subscribe(req=> {
      const joinRequest = {
        email: email,
        password: password,
      };
      this.httpService.logIn(joinRequest);
      },
        error1 => {
      this.isExist=true;
      this.showErrMail = true;
    });
  }

  joinFacebook(){
    let myWindow = window.open(Constants.FB_URL,
      "_blank", "width=600,height=500");
/*
      this.httpService.joinFacebook().subscribe(res=>{
        console.log(res);
    });*/

  }
}
