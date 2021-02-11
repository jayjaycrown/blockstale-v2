import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {


  constructor(private user: UserService, private route: ActivatedRoute, private router: Router) { }
serverErrorMessage;
  successMessage;
  ngOnInit(): void {
    const reference: string = this.route.snapshot.queryParamMap.get(
      'reference'
    );
     console.log(reference);
    this.user.verifyWalletPayment(reference).subscribe(
      (res) => {
        this.successMessage = res;
        console.log(res);
        setTimeout(() => {
          this.router.navigate(['wallet'])
        }, 5000);
      },
      (err) => {
        this.serverErrorMessage = err;
        console.log(err);
      }
    );
  }

}
