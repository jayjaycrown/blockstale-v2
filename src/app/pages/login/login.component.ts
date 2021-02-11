import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  return = '';
  returnUrl: string;
  userDetail: UserModel[] = [];
   model: any = {};
  successMessage: string;
  serverErrorMessages: string;
  constructor(
    private userService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.userService.currentUserValue) {
      alert('Already logged in');
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    // Get the query params
    this.route.queryParams
      // tslint:disable-next-line: no-string-literal
      .subscribe((params) => (this.return = params['return'] || '/dashboard'));
  }

  onSubmit(form: NgForm) {
    form.value.phoneNumber = '234' + form.value.phoneNumber;
    this.userService.login(form.value).subscribe(
      (res) => {
        if (res.token) {
          this.successMessage = res.message;
          // alert(this.successMessage);
          this.userDetail = res.user;

          this.router.navigate([this.returnUrl]);
        } else {
          this.serverErrorMessages = res.message;
        }
      },
      (err) => {
        this.serverErrorMessages = err;
      }
    );
  }

}
