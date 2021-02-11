


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgForm } from '@angular/forms';
import { SupportService } from '../../../services/support.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ticket;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  history;

  model = {
    accountName: '',
    accountNo: '',
    bankName: '',
  };
  registerModel = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  };
  buyModel = {
    buyAmount: '',
    coinType: ''
  };
  sellModel = {
    sellAmount: '',
  };
  membersProfile: any;
  members = true;
  profile;
  bank;
  newAdmin;
  successMessage;
  errorMessage;
  userBankDetails;
  editForm = false;
  editId = '';
  rates;
  bankRate;
  allTickets;
  searchText;
  test;
  dtOptions: DataTables.Settings = {};
  histories;
  sellhistories;
  withdrawHistories;
  payoutHistories;


  constructor(
    private auth: AuthService,
    public user: UserService,
    private support: SupportService
  ) {}
  onMember() {
    this.members = true;
    this.profile = false;
    this.bank = false;
    this.rates = false;
    this.ticket = false;
    this.history = false;
    this.newAdmin = false;
  }
  onProfile() {
    this.members = false;
    this.profile = true;
    this.bank = false;
    this.rates = false;
    this.ticket = false;
    this.history = false;
    this.newAdmin = false;
  }
  onRates() {
    this.members = false;
    this.profile = false;
    this.bank = false;
    this.rates = true;
    this.ticket = false;
    this.history = false;
    this.newAdmin = false;
  }
  onBank() {
    this.ticket = false;
    this.members = false;
    this.profile = false;
    this.bank = true;
    this.rates = false;
    this.history = false;
    this.newAdmin = false;
  }
  onTicket() {
    this.ticket = true;
    this.members = false;
    this.profile = false;
    this.bank = false;
    this.rates = false;
    this.history = false;
    this.newAdmin = false;
  }

  onHistory() {
    this.history = true;
    this.ticket = false;
    this.members = false;
    this.profile = false;
    this.bank = false;
    this.rates = false;
    this.newAdmin = false;
  }

  onnewAdmin() {
    this.newAdmin = true;
    this.history = false;
    this.ticket = false;
    this.members = false;
    this.profile = false;
    this.bank = false;
    this.rates = false;
  }
  ngOnInit(): void {
    this.support.refreshNeded$().subscribe((_) => {
      this.viewAllTickets();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
      };
    });

    this.user.refreshNeded$().subscribe((_) => {
      this.getAllBank();
      this.getAllMember();
      this.getConversionRate();
      this.getBuyHistory();
      this.getSellHistory();
      this.viewWithdrawHistory();
      this.viewPayoutHistories();
    })

    this.viewAllTickets();
    this.getAllBank();
    this.getAllMember();
    this.getConversionRate();
    this.getBuyHistory();
    this.getSellHistory();
    this.viewWithdrawHistory();
    this.viewPayoutHistories();
  }

  viewWithdrawHistory() {
    this.user.viewAllWitdraw().subscribe(res => {
      console.log(res)
      this.withdrawHistories = res;
    }, err => {
        console.log(err)
    })
  }
  viewPayoutHistories() {
    this.user.viewAllPayout().subscribe(res => {
      this.payoutHistories = res
      console.log(res);
    }, err => {
      console.log(err)
    })
  }

   getConversionRate() {
    this.user.getConversionRates().subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.bankRate = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllMember() {
    this.user.getAllMembers().subscribe((res) => {
      if (res) {
        this.membersProfile = res;

        console.log(this.membersProfile);
      }
    });
  }

  getAllBank() {
    this.user.adminGetBankDetails().subscribe(
      (res) => {
        this.userBankDetails = res;
        // console.log(res);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  viewAllTickets() {
    this.support.viewAllTickets().subscribe((res) => {
      console.log(res);
      this.allTickets = res;
      // tslint:disable-next-line: no-shadowed-variable
      // this.allTickets.sort((a, b) => b > a);
      this.test = [...this.allTickets].sort((a, b) => b - a);
      // console.log(this.test);
      // this.allTickets = this.allTickets.pipe(map(arr => arr.sort((a, b) => a > b)));
    });
  }
  deleteMember(memberId) {
    this.successMessage = '';
    this.errorMessage = '';
    const retval = confirm(
      'This process cannot be undone... Are you sure about this?'
    );
    if (retval === true) {
      this.user.deleteMember(memberId).subscribe(
        (res) => {
          this.successMessage = res;

          // location.reload();
        },
        (err) => {
          this.errorMessage = err;
        }
      );
    } else {
      this.errorMessage = 'Okay then, Please Be careful next time';
      return false;
    }
  }

  getConfirmation(bankId: any) {
    const retVal = confirm(
      'This process cannot be undone... Are you sure about this?'
    );
    if (retVal === true) {
      alert('Id is' + bankId)
      return this.deleteBank(bankId);
    } else {
      this.errorMessage = 'Okay then, Please Be careful next time';
      return false;
    }
  }

  deleteBank(bankId) {
    this.successMessage = '';
    this.errorMessage = '';

    this.user.adminDeleteBank(bankId).subscribe(
      (res) => {
        this.successMessage = res;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  callEditForm(id: any) {
    this.editForm = true;
    this.editId = id;
    alert('the id is' + this.editId);
  }
  Update(editId: any, form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';

    // console.log(form.value);
    // alert(editId);
    this.user.adminUpdateBank(editId, form.value).subscribe(
      (res) => {
        this.successMessage = res;
        this.model.accountName = '';
        this.model.accountNo = '';
        this.model.bankName = '';
        this.editForm = false;

        // location.reload();
      },
      (err) => {
        this.errorMessage = err;
        this.editForm = false;
      }
    );
  }

  setSellRates(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    this.user.setSellRates(form.value).subscribe(
      (res) => {
        this.successMessage = res;
        this.sellModel.sellAmount = '';
      },
      (err) => {
        this.errorMessage = err;
        this.sellModel.sellAmount = '';
      }
    );
  }
  setBuyRate(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    this.user.setBuyRates(form.value).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = res;
        this.buyModel.buyAmount = '';
        this.buyModel.coinType = '';
      },
      (err) => {
        console.log(err);
        this.buyModel.buyAmount = '';
        this.buyModel.coinType = '';
        this.errorMessage = err;
      }
    );
  }
  getDelete(id) {
    const retVal = confirm(
      'This process cannot be undone... Are you sure about this?'
    );
    if (retVal === true) {
      return this.deleteTicket(id);
    } else {
      this.errorMessage = 'Okay then, Please Be careful next time';
      return false;
    }
  }

  deleteTicket(id) {
    this.successMessage = '';
    this.errorMessage = '';
    this.support.deleteTicket(id).subscribe(
      (res) => {
        this.successMessage = res;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  updateTicket(id) {
    this.successMessage = '';
    this.errorMessage = '';
    // alert(id);

    this.support.updateTicket(id).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = res;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  getBuyHistory() {
    this.errorMessage = '';
    this.user.adminBuyHistory().subscribe(
      (res) => {
        console.log(res)
        this.histories = res;
      },
      (err) => {
        console.log(err)
        this.errorMessage = err;
      }
    );
  }
  getSellHistory() {
    this.errorMessage = '';
    this.user.adminSellHistory().subscribe(
      (res) => {
        console.log(res)
        this.sellhistories = res;
      },
      (err) => {
        console.log(err)
        this.errorMessage = err;
      }
    );
  }

  RegisterAdmin(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';
    form.value.phoneNumber = '234' + form.value.phoneNumber;
    this.auth.registerAdmin(form.value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.successMessage = res.message;
        } else {
          this.errorMessage = res.message;
        }
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }

}
