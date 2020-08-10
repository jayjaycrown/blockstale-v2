import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';


import { RegisterComponent } from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';
import { VerifyComponent } from '../../pages/verify/verify.component';
import { RequestResetComponent } from '../../pages/request-reset/request-reset.component';
import { ResponseResetComponent } from '../../pages/response-reset/response-reset.component';
import { AdminLoginComponent } from '../../pages/admin-login/admin-login.component';
import { MustMatchDirective } from '../../_helpers/must-match.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    AlertModule.forRoot(),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AdminLoginComponent,
    MustMatchDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthLayoutModule { }
