import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  buyRate;
  bankRate;
  payWithCard = true;
  payWithWallet;
  successMessage;
  serverErrorMessage;
  buyHistories;
  wallets = {
    walletBalance: 0
  };
  someInfo;

  buyModel = {
    amount: '',
    walletAddress: '',
    email: '',
    paymentType: ''
  };
  constructor(private user: UserService) { }

  onPayWithCard() {
    this.payWithCard = true;
    this.payWithWallet = false;
  }
  onPayWithWallet() {
    this.payWithCard = false;
    this.payWithWallet = true;
  }
  ngOnInit(): void {
    this.user.getConversionRates().subscribe(
      (res) => {
        if (res) {
          // console.log(res);
          this.bankRate = res;
          this.buyRate = this.bankRate[0].price_rate_buy;
        }
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );

    this.user.viewBuyHistory().subscribe(
      (res) => {
        console.log(res);
        this.buyHistories = res;
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );

    this.user.getWallet().subscribe((res:any) => {
      console.log(res)
      this.wallets = res;
    }, err => {
        console.log(err);
        this.serverErrorMessage = err;
    })
  }

  OnBuyBtc2(form: NgForm) {
    form.value.paymentType = 'card';
    console.log(form.value);
    this.user.buyBtc(form.value).subscribe(
      (res) => {
        window.location.assign(res);
        console.log(res);
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }

  OnBuyBtc(form: NgForm) {
    form.value.paymentType = 'wallet';
    console.log(form.value);
    this.serverErrorMessage = '';
    this.user.buyBtc(form.value).subscribe(
      (res) => {
        // window.location.assign(res);
        console.log(res);
        if (res.url) {
          window.location.assign(res.url);
        } else {
          this.successMessage = res;
          // console.log(res);
        }
        console.log(res);
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }

  fetchBtc(amount: any) {
    const ckAmount = {'amount': amount.model}
    console.log(ckAmount);
    console.log(amount.model);
    this.serverErrorMessage = '';
    this.user.convertNgnToBtc(ckAmount).subscribe(
      (res) => {
        // this.successMessage = res;
        console.log(res);
        this.someInfo = res;
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.serverErrorMessage = err;
      }
    );
  }

}
