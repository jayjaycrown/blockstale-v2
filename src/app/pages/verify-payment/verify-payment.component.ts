import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss'],
})
export class VerifyPaymentComponent implements OnInit {
  constructor(private auth: UserService, private route: ActivatedRoute, private router: Router) {}

  serverErrorMessage;
  successMessage;
  ngOnInit(): void {
    const reference: string = this.route.snapshot.queryParamMap.get(
      'reference'
    );
    // console.log(reference);
    this.auth.verifyPayment(reference).subscribe(
      (res) => {
        this.successMessage = res;
        setTimeout(() => {
          this.router.navigate(['dashboard'])
        }, 5000);
        // console.log(res);
      },
      (err) => {
        this.serverErrorMessage = err;
        // console.log(err);
      }
    );
  }
}
