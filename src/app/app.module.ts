import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmEqualValidatorDirective} from "./common/confirm-equal-validator.directive";
import { EntriesComponent } from './entrance/entries/entries.component';
import { RegistrationComponent } from './entrance/registration/registration.component';
import { InformationComponent } from './entrance/information/information.component';
import {TestPage2Component} from "./test-page2/test-page2.component";
import {TokenInterceptorService} from "./common/token.service";
import { EntranceComponent } from './entrance/entrance.component';
import {HttpService} from "./common/http.service";
import {authGuard} from "./common/auth-guard.service";
import {authGuardAdmin} from './common/auth-guard-admin.service';
import {ErrorHandler} from "./common/error-handler";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {TableModule} from 'primeng/table';
import {GMapModule} from 'primeng/gmap';
import { CookieService } from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';

const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: EntranceComponent },
  {path: 'forgot-password/:token', component: ResetPasswordComponent },
  {path: 'admin', component: AdminPageComponent, canActivate: [authGuardAdmin]},
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
    ResetPasswordComponent,
    AdminPageComponent
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
    TableModule,
    GMapModule,
    CalendarModule,
    MultiSelectModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: authGuardAdmin, useClass: authGuardAdmin},
    {provide: authGuard, useClass: authGuard},
    {provide: HttpService, useClass: HttpService},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: ErrorHandler, useClass: ErrorHandler},
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
