import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo } from '../../../types/types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  userId: string | null = '';
  userInfo: ContactInfo | null = null;
  editContactForm!: FormGroup;
  url = this.userInfo?.image??''
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('id'); 
    });

    this.editContactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]],
      email: ['', [Validators.required, Validators.email]],
      birthday: [''],
      image: [''],
      city: [''],
      street: [''],
      company: [''],
      position: [''],
      category: [''],
    });

    if (this.userId) {
      const data = localStorage.getItem('contacts');
      if (data) {
        const contacts: ContactInfo[] = JSON.parse(data);
        this.userInfo = contacts.find(user => user.id === Number(this.userId)) ?? null;
        if (this.userInfo) {
          this.url=this.userInfo.image || '';
          this.editContactForm.patchValue({
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            image:this.userInfo.image??'',
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            birthday: this.userInfo.birthday ? new Date(this.userInfo.birthday).toISOString().split('T')[0] : '',
            city: this.userInfo.city ?? '',
            street: this.userInfo.street ?? '',
            company: this.userInfo.company ?? '',
            position: this.userInfo.position ?? '',
            category: this.userInfo.category,
          });
        }
      }
    }
  }

  focusInput(input: HTMLInputElement){
    input.click()
  }
  onFileSelected(files: FileList | null) {
    if (files) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (event:Event) => {
          let fileReader = event.target as FileReader
          this.url = fileReader.result as string
        }
    }
  }
  editContact() {
    const data = localStorage.getItem('contacts');
    if(data){
      let contacts: ContactInfo[] = JSON.parse(data);
      contacts = contacts.map(contact=>{
        if(contact.id===this.userInfo?.id){

            return {
              ...this.editContactForm.value,
              id:this.userInfo.id,
              updatedAt: new Date(),
              image:this.url

            }
        }
        return contact
      })
      const sorted: ContactInfo[] = contacts.sort((a: ContactInfo, b: ContactInfo) => a.firstName.localeCompare(b.firstName));
      localStorage.setItem('contacts', JSON.stringify(sorted))

    }
    this.router.navigate([`/contacts/${this.userId}`])

  }
}
