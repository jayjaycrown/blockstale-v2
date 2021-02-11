import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  userDetail: UserModel[] = [];

  model: any = {};
  successMessage: string;
  serverErrorMessages: string;
  return = '';
  returnUrl: string;
  constructor(
    private userService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // redirect to Admin home if already logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/administrator']);
    }
  }

  ngOnInit(): void {
    this.returnUrl =
      // tslint:disable-next-line: no-string-literal
      this.route.snapshot.queryParams['returnUrl'] || '/administrator';
    // Get the query params
    this.route.queryParams.subscribe(
      // tslint:disable-next-line: no-string-literal
      (params) => (this.return = params['return'] || '/administrator')
    );
  }
  onSubmit(form: NgForm) {
    form.value.phoneNumber = '0' + form.value.phoneNumber;
    this.userService.adminLogin(form.value).subscribe(
      (res) => {
        if (res.token) {
          this.successMessage = res.message;
          // this.userService.setUser(res.userId, res.status);
          // this.userService.setToken(res.token);
          this.userDetail = res.user;
        } else {
          this.serverErrorMessages = JSON.stringify(res.message);
        }

        this.router.navigate([this.returnUrl]);
      },
      (err) => {
        this.serverErrorMessages = JSON.stringify(err);
        // alert(this.serverErrorMessages);
        console.log(err);
      }
    );
  }
}
