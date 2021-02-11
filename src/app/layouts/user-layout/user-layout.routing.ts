import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { UserComponent } from '../../pages/user/user.component';
import { WalletsComponent } from '../../pages/wallets/wallets.component';
import { PurchaseComponent } from '../../pages/purchase/purchase.component';
import { SellComponent } from '../../pages/sell/sell.component';
import { SupportComponent } from '../../pages/support/support.component';
import { UpgradeAccountComponent } from '../../pages/upgrade-account/upgrade-account.component';
import { FundWalletComponent } from '../../pages/fund-wallet/fund-wallet.component';
import { VerifyPaymentComponent } from '../../pages/verify-payment/verify-payment.component';

export const UserLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: UserComponent },
  { path: 'wallet', component: WalletsComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'sell', component: SellComponent },
  { path: 'support', component: SupportComponent },
  { path: 'upgrade-account-1/:token', component: UpgradeAccountComponent },
  { path: 'verify-funding', component: FundWalletComponent },
  {path:'verify-payment', component: VerifyPaymentComponent},
];
// https://exchange.blockstale.com/verify-funding?trxref=16423302&reference=16423302
