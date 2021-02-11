import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';

import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  viewTicket = true;
  createTicket;
  allTickets;
  dtOptions: DataTables.Settings = {};
  serverSuccessMessage;
  serverErrorMessages;
  supportModel: any = {};

  constructor(private ticket: SupportService) {}
  ngOnInit(): void {
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
     };

    this.ticket.refreshNeded$().subscribe((_) => {
      this.viewTickets();
    });
     this.viewTickets();
  }

  private viewTickets() {
    this.ticket.viewTickets().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.allTickets = data;
        }
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

   addTicket() {
    this.viewTicket = false;
    this.createTicket= true
  }
  showTickets() {
    this.viewTicket= true;
    this.createTicket = false
  }

  getConfirmation(id: any) {
    this.serverErrorMessages = '';
    const retVal = confirm(
      'This process cannot be undone... Are you sure about this?'
    );
    if (retVal === true) {
      return this.deleteTicket(id);
    } else {
      this.serverErrorMessages = 'Okay then, Please Be careful next time';
      return false;
    }
  }

   deleteTicket(id) {
    this.serverSuccessMessage = '';
    this.serverErrorMessages = '';

    this.ticket.deleteMyTicket(id).subscribe(
      (res) => {
        this.serverSuccessMessage = res;
      },
      (err) => {
        this.serverErrorMessages = err;
      }
    );
  }

  submitTicket(form: NgForm) {
    this.serverErrorMessages = '';
    this.serverSuccessMessage = '';

    this.supportModel = '';
    this.ticket.submitTicket(form.value).subscribe(
      (res) => {
        this.serverSuccessMessage = res;

        this.createTicket = false;
        this.viewTicket = true;
        // setTimeout(() => {
        //   location.reload();
        // }, 3000);
      },
      (err) => {
        this.serverErrorMessages = err;
      }
    );
  }
}
