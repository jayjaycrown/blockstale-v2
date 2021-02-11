import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: AuthService,
    private router: Router
  ) { }

  successMessage = '';
  serverErrorMessages = '';
  userDetail: UserModel[] = [];
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  model: any = {};

  onSubmit(form: NgForm) {
    form.value.phoneNumber = '234' + form.value.phoneNumber;

    this.userService.register(form.value).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.successMessage = res;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        } else {
          this.serverErrorMessages = res.message;
        }
      },
      (err) => {
        this.serverErrorMessages = err;
        console.log(err)
      }
    );
  }

  ngOnInit(): void {
  }

}
