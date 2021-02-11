import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { RegisterComponent } from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';
import { VerifyComponent } from '../../pages/verify/verify.component';
import { RequestResetComponent } from '../../pages/request-reset/request-reset.component';
import { ResponseResetComponent } from '../../pages/response-reset/response-reset.component';
import { AdminLoginComponent } from '../../pages/admin-login/admin-login.component';


export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'admin_login',
    component: AdminLoginComponent
  },
  {
    path: 'request-reset-password',
    component: RequestResetComponent,
  },
  {
    path: 'reset_password',
    component: ResponseResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(AuthLayoutRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
