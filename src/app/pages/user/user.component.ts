import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import jsonDoc from '../../models/doc';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  serverSuccessMessage;
  serverErrorMessages;
  accountInformation;
  accountInfo = false;
  model: any = {};
  accountDetails = [];
  unlimitedAccount;
  upgrade100;
  upgrade500;
  upgrade = false;
  submitted = false;
  profile;
  support;
  account = true;
  profiles;
  profileresult: any = {};
  profileUrl;
  selectedImage: any;
  successMessage;
  errorMessage;
  uploadMessage;
  uploadErrorMessage;
  uploadForm: FormGroup;
  allTickets;
  supportModel: any = {};
  searchText = '';
  showdetails = true;
  showUploadForm1;
  ShowUploadForm2;
  ShowBankUploadForm;

  editorContent: object = jsonDoc;
  dtOptions: DataTables.Settings = {};
  create;
  view = true;

  models = {
    email: '',
  };
  modelUn = {
    bvn: '',
  };
  constructor(private user: UserService) { }

  showBankUpload() {
    this.ShowBankUploadForm = true;
    this.showdetails = false;
    this.showUploadForm1 = false;
    this.ShowUploadForm2 = false;
  }
  showUpload1() {
    this.showUploadForm1 = true;
    this.showdetails = false;
    this.ShowBankUploadForm = false;
    this.ShowUploadForm2 = false;
  }
  showUpload2() {
    this.ShowUploadForm2 = true;
    this.showUploadForm1 = false;
    this.showdetails = false;
    this.ShowBankUploadForm = false;
  }
  showDetail() {
    this.showdetails = true;
    this.ShowUploadForm2 = false;
    this.showUploadForm1 = false;
    this.ShowBankUploadForm = false;
  }

  ngOnInit() {
    this.user.refreshNeded$().subscribe((_) => {
      this.getBankDetails();
      this.getProfile();
    });

    this.getBankDetails();
    this.getProfile();
  }

  private getProfile() {
    this.user.profile().subscribe((res: any) => {
      if (res) {
        // console.log(res);
        this.profiles = res;
        this.profileresult = this.profiles.result;
        this.profileUrl = this.profiles.profileUrl;
        console.log(this.profileresult);
        if (this.profiles.result.account_limit === '100') {
          this.upgrade100 = true;
          this.upgrade500 = false;
        } else if (this.profiles.result.account_limit === '500') {
          this.upgrade500 = true;
          this.upgrade100 = false;
        } else {
          this.unlimitedAccount = true;
        }
      }
    });
  }

  private getBankDetails() {
    this.serverErrorMessages = '';
    this.user.getBankDetails().subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length <= 0) {
          this.accountInfo = true;
        } else {
          this.accountInformation = res;
          this.accountInfo = false;
        }
      },
      (err) => {
        this.serverErrorMessages = err;
      }
    );
  }


  submitBank(form: NgForm) {
    // console.log(form.value);
    this.user.bankDetails(form.value).subscribe(
      (res) => {
        this.serverSuccessMessage = res.message;
        this.showDetail();
        console.log(res);
      },
      (err) => {
        this.serverSuccessMessage = err.message;
        console.log(err);
      }
    );
  }

  submit(form: NgForm) {
    this.serverSuccessMessage = '';
    this.serverErrorMessages = '';

    // console.log(form.value);
    this.user.upgradeAccount(form.value).subscribe(
      (res) => {
        // console.log(res);
        if (res) {
          this.models.email = '';
          this.submitted = true;
          this.serverSuccessMessage = res.message;
          this.showDetail();
        } else {
          console.log(res);
          this.showDetail();
        }
      },
      (err) => {
        this.serverErrorMessages = err;
        console.log(err);
        this.showDetail();
      }
    );
  }

  submitUn(form: NgForm) {
    this.serverSuccessMessage = '';
    this.serverErrorMessages = '';

    this.user.upgradeAccount2(form.value).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.models.email = '';
          this.submitted = true;
          this.serverSuccessMessage = res;
          this.showDetail();
        }
      },
      (err) => {
        this.serverErrorMessages = err;
        console.log(err);
        this.showDetail();
      }
    );
  }
}
