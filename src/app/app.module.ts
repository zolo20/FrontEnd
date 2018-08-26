import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmEqualValidatorDirective} from "./entrance/registration/confirm-equal-validator.directive";
import { EntriesComponent } from './entrance/entries/entries.component';
import { RegistrationComponent } from './entrance/registration/registration.component';
import { InformationComponent } from './entrance/information/information.component';
import {TestPage2Component} from "./test-page2/test-page2.component";
import { EntranceComponent } from './entrance/entrance.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from "./common/auth-guard.service";

const routes = [
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: EntranceComponent },
  {path: 'login', component: LoginComponent },
  {path: 'app', component: TestPage2Component, canActivate: [authGuard] }
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [authGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
