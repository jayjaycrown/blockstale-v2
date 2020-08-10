import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  serverErrorMessages;
  successMessage;
  model = {
    verify: ''
  };
  response;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.auth.verify(form.value.verify).subscribe(res => {
      this.response = res;
      if (this.response.status === 200) {
        this.successMessage = this.response.message;
        setTimeout(() => {
          this.router.navigate(['auth']);
        }, 3000);
      }
      else {
        this.serverErrorMessages = this.response.message;
      }
    }, err => {
        this.serverErrorMessages = err.message;
    });
  }

}
