import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from '../shared/contact.service'; 
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})

export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  this.resetForm();
  this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
      if(form)
      form.reset();
      this.contactService.selectedContact = {
        _id: "",
        name:"",
        email:"",
        phoneNo: null
      }
  }

  onSubmit(form: NgForm) {
   this.contactService.postContact(form.value).subscribe((res) => {
   this.resetForm(form);
   this.refreshEmployeeList();
   });
  }

  refreshEmployeeList() {
    this.contactService.getContactList().subscribe((res) => {
    this.contactService.contacts = res as Contact[];
    });
  }

}
