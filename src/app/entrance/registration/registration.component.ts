import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import {User} from '../../common/User';
import {HttpService} from '../../common/http.service';
import {Constants} from '../../common/constants';
import {MessageService} from 'primeng/api';
import {ErrorHandler} from '../../common/error-handler';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  reqStr: any;
  isExist: boolean;
  code: any;
  myWindow = window;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.hide = this.eref.nativeElement.contains(event.target);
  }

  constructor(private httpService: HttpService, private eref: ElementRef, private router: Router,
              private cookieService: CookieService, private activatedRoute: ActivatedRoute,
              private messageService: MessageService, private errHandler: ErrorHandler) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['code'] != undefined) {
        console.log(params['code']);
        let url = 'https://graph.facebook.com/v3.1/oauth/access_token?' +
          'client_id=' + Constants.FACEBOOK_CLIENT_ID +
          '&redirect_uri=' + Constants.FACEBOOK_URL +
          '&display=popup&scope=email' +
          '&client_secret=' + Constants.FACEBOOK_SECRET +
          '&code=' + params['code'];
        this.httpService.requestFB(url).subscribe(res => {
          console.log(res);
          let obj = JSON.stringify(res);
          let token = JSON.parse(obj).access_token;
          let urlData = 'https://graph.facebook.com/v3.1/me?' +
            'client_id=' + Constants.FACEBOOK_CLIENT_ID +
            '&redirect_uri=' + Constants.FACEBOOK_URL +
            '&display=popup' +
            '&client_secret=' + Constants.FACEBOOK_SECRET +
            '&code=' + params['code'] +
            '&access_token=' + token +
            '&fields=name,email';
          this.httpService.requestFB(urlData).subscribe(res => {
            console.log(res);
            let obj = JSON.stringify(res);
            let email = JSON.parse(obj).email;
            let name = JSON.parse(obj).name;
            localStorage.setItem('token', token);
            console.log(name);
            console.log(email);
          });
        });
      }
    });
  }


  clickFirst() {
    this.showErrFirst = true;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = false;
  }

  clickLast() {
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
    this.httpService.signUp(request).subscribe(req => {
        const joinRequest = {
          email: email,
          password: password,
        };
        this.httpService.logIn(joinRequest).subscribe(response => {
          localStorage.setItem('token', response.headers.get(Constants.TOKEN_NAME));
          let role = this.cookieService.get('role');
          if (role == 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/app');
          }
        }, err => {
          this.messageService.add({severity: 'error', summary: 'Access', detail: 'Wrong login or password'});
          this.errHandler.handleAuthError(err, false);
        });

      },
      err => {
        this.isExist = true;
        this.showErrMail = true;
      });
  }

  joinFacebook() {
    this.myWindow.open(
      'https://www.facebook.com/v3.1/dialog/oauth?client_id=' + Constants.FACEBOOK_CLIENT_ID +
      '&redirect_uri=' + Constants.FACEBOOK_URL + '&display=popup&response_type=code&scope=email',
      '_blank', 'width=600,height=500');
  }
}


