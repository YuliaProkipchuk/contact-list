import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '../../../types/types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit{
  userId: string | null = '';
  userInfo:ContactInfo|null=null;
  url = ''
  constructor(private route: ActivatedRoute, private router:Router){

  }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    const data = localStorage.getItem('contacts');
    if(data){
      const contacts:ContactInfo[] = JSON.parse(data);
      this.userInfo = contacts.find(user=>user.id===Number(this.userId))!
      this.url = this.userInfo.image || ''
    }
  }
  deleteContact(){
    let data = localStorage.getItem('contacts');
    let contacts:ContactInfo[] = (JSON.parse(data!) as ContactInfo[]).filter(contact=>contact.id!==Number(this.userId));
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.router.navigate([``])

  }
}
