import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DataTablesModule} from 'angular-datatables';



import { AdminLayoutRoutes } from './admin-layout.routing';
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
// import { RtlComponent } from "../../pages/rtl/rtl.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    DataTablesModule,
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
    // RtlComponent
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminLayoutModule {}
