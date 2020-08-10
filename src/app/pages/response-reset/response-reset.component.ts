import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  serverErrorMessages;
  successMessage;
  model = {
    otp: ''
  };
  resetModel = {
    password: ''
  };
  response;
  check = true;
  reset;
  OTP;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.OTP = form.value.otp;
    this.auth.checkOtp(form.value.otp).subscribe(res => {
      this.response = res;
      if (this.response.status === 200) {
        this.successMessage = this.response.message;
        setTimeout(() => {
          this.check = false;
          this.reset = true;
        }, 2000);
      }
      else {
        this.serverErrorMessages = this.response.message;
      }

      console.log(res);
    }, err => {
        this.serverErrorMessages = err;
        console.log(err);
    });
  }

  OnReset(reset: NgForm) {
    this.auth.resetPassword(this.OTP, reset.value).subscribe(res => {
      this.successMessage = res;
      setTimeout(() => {
        this.router.navigateByUrl('auth');
      }, 5000);
    }, err => {
        this.serverErrorMessages = err;
    });
  }

}
