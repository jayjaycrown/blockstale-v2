import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  payWithCard = true;
  payWithWallet;
  constructor() { }

  onPayWithCard() {
    this.payWithCard = true;
    this.payWithWallet = false;
  }
  onPayWithWallet() {
    this.payWithCard = false;
    this.payWithWallet = true;
  }
  ngOnInit(): void {
  }

}
