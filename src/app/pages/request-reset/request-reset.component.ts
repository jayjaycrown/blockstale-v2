import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  serverErrorMessages;
  successMessage;
  model = {
    phoneNumber: ''
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    form.value.phoneNumber = '234' + form.value.phoneNumber;
    console.log(form.value);
    this.auth.forgotPassword(form.value).subscribe(res => {
      if (res.status === 200) {
        console.log(res.message);
        this.successMessage = res.message;
        setTimeout(() => {
          this.router.navigateByUrl('auth/reset_password');
        }, 3000);
      } else {
        this.serverErrorMessages = res;
        console.log(res);
      }
    }, err => {
        console.log(err);
        this.serverErrorMessages = err;
    });
  }

}
