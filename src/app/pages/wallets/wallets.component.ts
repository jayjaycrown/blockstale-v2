import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {

  successMessage;
  errorMessage;
  wallet = {
    walletBalance: 0
  };
  walletModel: any = {}
  fund = true
  withdraw = false
  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.user.getWallet().subscribe((res:any) => {
      console.log(res)
      this.wallet = res;
    }, err => {
        console.log(err);
        this.errorMessage = err;
    })
  }
  onFund() {
    this.fund = true
    this.withdraw = false
  }
  onWithdraw() {
    this.fund = false
    this.withdraw = true
  }

  OnFundWallet(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    console.log(form.value);
    this.user.fundWallet(form.value).subscribe((res: any) => {
      console.log(res)
      window.location.assign(res);
    }, err => {
        this.errorMessage = err;
    })
  }

  witdrawFromWallet(form: NgForm) {
    console.log(form.value)
    this.successMessage = '';
    this.errorMessage = '';
    this.user.witdrawFromWallet(form.value).subscribe(res => {
      console.log(res)
      this.successMessage = res
    }, err => {
        console.log(err)
        this.errorMessage = err
    })
  }

}
