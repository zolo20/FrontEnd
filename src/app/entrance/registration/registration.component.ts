import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import {User} from "../../common/User";
import {HttpService} from "../../common/http.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  show: boolean;
  showErrFirst: boolean;
  showErrLast: boolean;
  showErrMail: boolean;
  showErrPass: boolean;
  showErrConfPass: boolean;
  reqStr:any;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.show = this.eref.nativeElement.contains(event.target);
  }

  constructor(private httpService: HttpService, private eref: ElementRef) {
  }

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

  registration(login: string, password: string, name: string, surname: string) {
    const request = {
      login: login,
      password: password,
      name: name,
      surname: surname
    };
    this.httpService.signUp(request).subscribe(req=>{},error1 => console.log(error1));
  }
}
