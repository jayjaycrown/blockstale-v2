import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { ErrorInterceptor } from '../../_helpers/error.interceptor';
import { AlertModule } from 'ngx-bootstrap/alert';




import { UserLayoutRoutes } from './user-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserComponent } from '../../pages/user/user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { WalletsComponent } from '../../pages/wallets/wallets.component';
import { PurchaseComponent } from '../../pages/purchase/purchase.component';
import { SellComponent } from '../../pages/sell/sell.component';
import { SupportComponent } from '../../pages/support/support.component';
import { UpgradeAccountComponent } from '../../pages/upgrade-account/upgrade-account.component';
import { FundWalletComponent } from '../../pages/fund-wallet/fund-wallet.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    DataTablesModule,
    AlertModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    WalletsComponent,
    PurchaseComponent,
    SellComponent,
    SupportComponent,
    UpgradeAccountComponent,
    FundWalletComponent
    // RtlComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class UserLayoutModule {}
