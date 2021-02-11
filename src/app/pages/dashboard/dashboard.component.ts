import { Component, OnInit } from '@angular/core';

import { CryptoChartService } from '../../services/crypto-chart.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  successMessage;
  serverErrorMessage;
  data;
  btcData:any = {};
  ethData:any = {};
  ltcData: any = {};
  xrpData: any = {};
  xmrData:any = {};
  changepositive;
  iconClass;
  ethColor;
  ethIcon;
  ltcColor;
  ltcIcon;
  xrpColor;
  xrpIcon;
  xmrColor;
  xmrIcon;
  wallet = {
    walletBalance: '0'
  };
  constructor(private cryptoChart: CryptoChartService, private user: UserService) {}

  ngOnInit() {
    this.cryptoChart.getCryptoPrice().subscribe((res: any) => {
      this.data = res;
      this.btcData = this.data.RAW.BTC.NGN;
      if (this.btcData.CHANGEPCTHOUR <= 0) {
        this.changepositive = 'red-text';
        this.iconClass = 'cancelled fa fa-arrow-down';
      } else {
        this.changepositive = 'green-text';
        this.iconClass = 'complete fa fa-arrow-up';
      }
      this.ethData = this.data.RAW.ETH.NGN;
      console.log(this.ethData);
      if (this.ethData.CHANGEPCTHOUR <= 0) {
        this.ethColor = 'red-text';
        this.ethIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.ethColor = 'green-text';
        this.ethIcon = 'complete fa fa-arrow-up';
      }
      this.ltcData = this.data.RAW.LTC.NGN;
      if (this.ltcData.CHANGEPCTHOUR <= 0) {
        this.ltcColor = 'red-text';
        this.ltcIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.ltcColor = 'green-text';
        this.ltcIcon = 'complete fa fa-arrow-up';
      }
      this.xmrData = this.data.RAW.XMR.NGN;
      if (this.xmrData.CHANGEPCTHOUR <= 0) {
        this.xmrColor = 'red-text';
        this.xmrIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.xmrColor = 'green-text';
        this.xmrIcon = 'complete fa fa-arrow-up';
      }

      this.xrpData = this.data.RAW.XRP.NGN;
      if (this.xrpData.CHANGEPCTHOUR <= 0) {
        this.xrpColor = 'red-text';
        this.xrpIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.xrpColor = 'green-text';
        this.xrpIcon = 'complete fa fa-arrow-up';
      }
    }, err => {
        this.serverErrorMessage = err;
        console.log(err);
    })

    this.user.getWallet().subscribe((res:any) => {
      console.log(res)
      if (res) {
        this.wallet = res;
      }

    }, err => {
        console.log(err);
        this.serverErrorMessage = err;
    })
  }
}
