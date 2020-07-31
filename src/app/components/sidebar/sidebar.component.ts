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
    path: '/dashboard',
    title: 'Dashboard',
    rtlTitle: 'لوحة القيادة',
    icon: 'assets/data/crypto-dash/icons/1.png',
    class: ''
  },
  // {
  //   path: '/wallet',
  //   title: 'E-Wallet',
  //   rtlTitle: 'لوحة القيادة',
  //   icon: 'assets/data/crypto-dash/icons/2.png',
  //   class: ''
  // },
  {
    path: '/purchase',
    title: 'Buy Coin',
    rtlTitle: 'لوحة القيادة',
    icon: 'assets/data/crypto-dash/icons/6.png',
    class: ''
  },
  {
    path: '/sell',
    title: 'Sell Coin',
    rtlTitle: 'لوحة القيادة',
    icon: 'assets/data/crypto-dash/icons/6.png',
    class: ''
  },
  // {
  //   path: '/icons',
  //   title: 'Icons',
  //   rtlTitle: 'الرموز',
  //   icon: 'assets/data/crypto-dash/icons/2.png',
  //   class: ''
  // },
  // {
  //   path: '/maps',
  //   title: 'Maps',
  //   rtlTitle: 'خرائط',
  //   icon: 'assets/data/crypto-dash/icons/6.png',
  //   class: '' },
  // {
  //   path: '/notifications',
  //   title: 'Notifications',
  //   rtlTitle: 'إخطارات',
  //   icon: 'assets/data/crypto-dash/icons/4.png',
  //   class: ''
  // },

  {
    path: '/profile',
    title: 'User Profile',
    rtlTitle: 'ملف تعريفي للمستخدم',
    icon: 'assets/data/crypto-dash/icons/8.png',
    class: ''
  },
  {
    path: '/support',
    title: 'Help Desk',
    rtlTitle: 'لوحة القيادة',
    icon: 'assets/data/crypto-dash/icons/12.png',
    class: ''
  },
  // {
  //   path: '/tables',
  //   title: 'Table List',
  //   rtlTitle: 'قائمة الجدول',
  //   icon: 'assets/data/crypto-dash/icons/10.png',
  //   class: ''
  // },
  // {
  //   path: '/typography',
  //   title: 'Typography',
  //   rtlTitle: 'طباعة',
  //   icon: 'assets/data/crypto-dash/icons/12.png',
  //   class: ''
  // },
  // {
  //   path: '/rtl',
  //   title: 'RTL Support',
  //   rtlTitle: 'ار تي ال',
  //   icon: 'assets/data/crypto-dash/icons/12.png',
  //   class: ''
  // }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
