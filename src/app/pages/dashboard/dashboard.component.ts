import { Component, OnInit } from '@angular/core';

import { CryptoChartService } from '../../services/crypto-chart.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data;
  btcData:any = {};
  ethData:any = {};
  ltcData:any = {};
  changepositive;
  iconClass;
  ethColor;
  ethIcon;
  ltcColor;
  ltcIcon;
  constructor(private cryptoChart: CryptoChartService) {}

  ngOnInit() {
    // this.cryptoChart.getCryptoPrice().subscribe((res: any) => {
    //   this.data = res;
    //   this.btcData = this.data.RAW.BTC.NGN;
    //   if (this.btcData.CHANGEPCTHOUR <= 0) {
    //     this.changepositive = 'red-text';
    //     this.iconClass = 'cancelled fa fa-arrow-down';
    //   } else {
    //     this.changepositive = 'green-text';
    //     this.iconClass = 'complete fa fa-arrow-up';
    //   }
    //   this.ethData = this.data.RAW.ETH.NGN;
    //   console.log(this.ethData);
    //   if (this.ethData.CHANGEPCTHOUR <= 0) {
    //     this.ethColor = 'red-text';
    //     this.ethIcon = 'cancelled fa fa-arrow-down';
    //   } else {
    //     this.ethColor = 'green-text';
    //     this.ethIcon = 'complete fa fa-arrow-up';
    //   }
    //   this.ltcData = this.data.RAW.LTC.NGN;
    //   if (this.ltcData.CHANGEPCTHOUR <= 0) {
    //     this.ltcColor = 'red-text';
    //     this.ltcIcon = 'cancelled fa fa-arrow-down';
    //   } else {
    //     this.ltcColor = 'green-text';
    //     this.ltcIcon = 'complete fa fa-arrow-up';
    //   }
    // }, err => {
    //     console.log(err);
    // })
  }
}
