import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo } from '../../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
})
export class NewContactComponent {
  url = ''

  newContactForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthday: new FormControl(""),
    image: new FormControl(""),
    city: new FormControl(""),
    street: new FormControl(""),
    company: new FormControl(""),
    position: new FormControl(""),
    category: new FormControl(""),

  })
  constructor(private router: Router) { }
  focusInput(input: HTMLInputElement) {
    input.click()
  }
  onFileSelected(files: FileList | null) {
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event: Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result as string
      }
    }
  }
  addNewContact() {
    const formValue = this.newContactForm.value;
    const data = localStorage.getItem('contacts');
    let contacts: ContactInfo[] = [];

    if (data) {
      contacts = JSON.parse(data!);
    }
    contacts.push({
      ...formValue,
      id: Date.now(),
      image: this.url,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const sorted: ContactInfo[] = contacts.sort((a: ContactInfo, b: ContactInfo) => a.firstName.localeCompare(b.firstName));

    localStorage.setItem('contacts', JSON.stringify(sorted))
    this.router.navigate([''])
  }
}
