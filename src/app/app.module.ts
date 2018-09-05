import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router, RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmEqualValidatorDirective} from "./common/confirm-equal-validator.directive";
import { EntriesComponent } from './entrance/entries/entries.component';
import { RegistrationComponent } from './entrance/registration/registration.component';
import { InformationComponent } from './entrance/information/information.component';
import {TestPage2Component} from "./test-page2/test-page2.component";
import {TokenInterceptorService} from "./common/token.service";
import { EntranceComponent } from './entrance/entrance.component';
import { LoginComponent } from './login/login.component';
import {HttpService} from "./common/http.service";
import {authGuard} from "./common/auth-guard.service";
import {ErrorHandler} from "./common/error-handler";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: EntranceComponent },
  {path: 'login', component: LoginComponent },
  {path: 'forgot-password/:token', component: ResetPasswordComponent },
  {path: 'app', component: TestPage2Component, canActivate: [authGuard] },
  {path: '**', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    RegistrationComponent,
    InformationComponent,
    ConfirmEqualValidatorDirective,
    TestPage2Component,
    EntranceComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: authGuard, useClass: authGuard},
    {provide: HttpService, useClass: HttpService},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: ErrorHandler, useClass: ErrorHandler}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
