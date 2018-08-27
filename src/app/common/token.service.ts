import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "./constants";
import {catchError} from "rxjs/internal/operators";
import {ErrorHandler} from "./error-handler";


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: HttpService, private errHandler: ErrorHandler) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== Constants.SIGN_UP_URL) {
      if (req.url !== Constants.LOG_IN_URL && this.authService.getToken() !== null) {
        req = req.clone({
          setHeaders: {
            Authorization: this.authService.getToken(),
            Role: this.authService.getRole()
          }
        });
      }
      return next.handle(req).pipe(catchError(err => this.errHandler.handleAuthError(err)));
    } else {
      return next.handle(req);
    }
  }
}
