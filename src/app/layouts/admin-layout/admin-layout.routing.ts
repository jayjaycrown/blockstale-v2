import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserComponent } from '../../pages/user/user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { WalletsComponent } from '../../pages/wallets/wallets.component';
import { PurchaseComponent } from '../../pages/purchase/purchase.component';
import { SellComponent } from '../../pages/sell/sell.component';
import { SupportComponent } from '../../pages/support/support.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'icons', component: IconsComponent },
  // { path: 'maps', component: MapComponent },
  // { path: 'notifications', component: NotificationsComponent },
  { path: 'profile', component: UserComponent },
  // { path: 'tables', component: TablesComponent },
  // { path: 'typography', component: TypographyComponent },
  { path: 'wallet', component: WalletsComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'sell', component: SellComponent },
  {path: 'support', component: SupportComponent},
  // { path: "rtl", component: RtlComponent }
];
