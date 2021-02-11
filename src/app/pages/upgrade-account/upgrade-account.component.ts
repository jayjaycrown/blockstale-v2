import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.component.html',
  styleUrls: ['./upgrade-account.component.scss'],
})
export class UpgradeAccountComponent implements OnInit {
  token: any;
  verified;
  successMessage;
  errorMessage;
  model: any = {
    fullName: '',
  };

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private auth: UserService,
    private loader: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      // tslint:disable-next-line: no-string-literal
      this.token = params['token'];

      this.auth.verifyToken(this.token).subscribe(
        (res) => {
          if (res) {
            this.verified = true;
            this.successMessage = res.message;
          }
        },
        (err) => {
          this.errorMessage = err.message;
        }
      );
    });
  }

  onSubmit(token, form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';

    this.auth.upgradetoLevel2(token, form.value).subscribe(
      (res) => {
        this.successMessage = res;
        // alert(res);

        this.router.navigateByUrl('/profile');
      },
      (err) => {
        this.errorMessage = err;

        // alert(err);
      }
    );
  }
}
