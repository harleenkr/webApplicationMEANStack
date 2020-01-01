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

  searchFilter: string;
  limit: number;
  searchKeyword: string;
  number: string;
  showMoreError: false;
  showAllContacts: boolean;
  showContacts: any;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.contactService.selectedContact = {
      _id: "",
      name: "",
      email: "",
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

  onEdit(con: Contact) {
    this.contactService.selectedContact = con;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this record ?') == true) {
      this.contactService.deleteContact(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }

  onSearch(searchKeyword, number) {
    if (searchKeyword) {
      if (searchKeyword.length > 0) {
        this.limit = 0;
        this.searchFilter = searchKeyword;
        this.limit = number;
      } else {
        this.searchFilter = undefined;
        this.limit = 0;
      }
    }
    else {
      this.searchFilter = undefined;
      this.limit = 0;
    }

  }

  Search() {
    this.showContacts = this.contactService.contacts.filter(res => {
      return (res.name.toLocaleLowerCase().match(this.searchKeyword.toLocaleLowerCase()) || res.email.toLocaleLowerCase().match(this.searchKeyword.toLocaleLowerCase()));
    });
  }

  onClear() {
    this.number = 'Clear';
    this.limit = 0;
    this.searchKeyword = undefined;
    this.searchFilter = undefined;
    this.showMoreError = false;
    this.showAllContacts = false;
  }

  onShow(checkShow: boolean, Contact) {
    if(this.contactService.contacts.length > 0) {
      this.showAllContacts = checkShow;
      this.contactService.contacts = Contact;
    }
    else {
      this.showAllContacts = false;
    }
  }
}
