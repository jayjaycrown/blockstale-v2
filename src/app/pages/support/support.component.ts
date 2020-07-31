import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  viewTicket = true;
  createTicket;
   dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

   addTicket() {
    this.viewTicket = false;
    this.createTicket= true
  }
  showTickets() {
    this.viewTicket= true;
    this.createTicket = false
  }
}
