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
    if (form.value._id == "") {
   this.contactService.postContact(form.value).subscribe((res) => {
   this.resetForm(form);
   this.refreshEmployeeList();
   });
  }
  else {
    this.contactService.putContact(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      });
  }
  }

  refreshEmployeeList() {
    this.contactService.getContactList().subscribe((res) => {
    this.contactService.contacts = res as Contact[];
    });
  }

  onEdit(con : Contact) {
   this.contactService.selectedContact = con;
  }

  onDelete(_id : string, form: NgForm) {
    if(confirm('Are you sure you want to delete this record ?') == true) {
      this.contactService.deleteContact(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
   }

}
