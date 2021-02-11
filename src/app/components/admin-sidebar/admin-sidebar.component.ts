import { Component, OnInit } from '@angular/core';


 declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
 }

export const ROUTES: RouteInfo[] = [
   {
    path: '/administrator',
    title: 'Dashboard',
    rtlTitle: 'لوحة القيادة',
    icon: 'assets/data/crypto-dash/icons/1.png',
    class: ''
  },
 ]
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
menuItems: any[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

}
