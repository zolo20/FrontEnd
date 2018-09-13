import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpService} from '../../common/http.service';
import {Router} from '@angular/router';
import {User} from '../../common/User';
import {Constants} from '../../common/constants';
import {MessageService} from 'primeng/api';
import {ErrorHandler} from '../../common/error-handler';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})
export class EntriesComponent implements OnInit {

  user: User = new User();
  display: boolean = false;
  @Output() active: EventEmitter<any> = new EventEmitter();


  constructor(private httpService: HttpService, private router: Router, private cookieService: CookieService,
              private messageService: MessageService, private errHandler: ErrorHandler) {
  }

  ngOnInit() {
    let role = this.cookieService.get('role');
    if (localStorage.getItem('token') != null && role == 'USER') {
      this.router.navigate(['/user',this.cookieService.get('id')]);
    }
    if (localStorage.getItem('token') != null && role == 'ADMIN') {
      this.router.navigate(['/admin',this.cookieService.get('id')]);
    }
  }

  logIn(email: string, password: string) {
    const request = {
      email: email,
      password: password,
    };
    this.httpService.logIn(request)
      .subscribe(response => {
        localStorage.setItem('token', response.headers.get(Constants.TOKEN_NAME));
        let role = this.cookieService.get('role');
        if (role == 'ADMIN') {
          this.router.navigate(['/admin',this.cookieService.get('id')]);
        } else {
          this.router.navigate(['/user',this.cookieService.get('id')]);
        }
      }, err => {
        if (err.status === 401 || err.status === 403) {
          this.messageService.add({severity: 'error', summary: 'Access', detail: 'Wrong login or password'});
        }
        this.errHandler.handleAuthError(err, false);
      });
  }

  showDialog() {
    this.display = true;
    this.active.emit(this.display);
  }
}
