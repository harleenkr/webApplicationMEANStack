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
    console.log("function is called");
    console.log("searchKeyword value", searchKeyword);
    console.log("number value", number);
    if (searchKeyword) {
      console.log("searchKeyword",searchKeyword);
      if (searchKeyword.length > 0) {
        console.log("searchKeyword.length",searchKeyword.length);
        this.limit = 0;
        console.log("this.limit",this.limit);
        this.searchFilter = searchKeyword;
        console.log("this.searchFilter",this.searchFilter);
        this.limit = number;
        console.log("this.limit",this.limit);
      } else {
        console.log("else part of searchKeyword");
        this.searchFilter = undefined;
        console.log("this.searchFilter",this.searchFilter);
        this.limit = 0;
        console.log("this.limit",this.limit);
      }
    }
    else {
      this.searchFilter = undefined;
      this.limit = 0;
    }

  }

  Search() {
    // if (this.searchKeyword !== null) {
    this.contactService.contacts = this.contactService.contacts.filter(res => {
      return (res.name.toLocaleLowerCase().match(this.searchKeyword.toLocaleLowerCase()) || res.email.toLocaleLowerCase().match(this.searchKeyword.toLocaleLowerCase()));
    });
  // } else {
  //     return this.contactService.contacts;
  // }
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
      //this.contactService.contacts = Contact;
      console.log("if this.showAllContacts",this.showAllContacts);
    }
    else {
      this.showAllContacts = false;
      //this.contactService.contacts = Contact;
      console.log("else this.showAllContacts",this.showAllContacts);
    }
  }
}
