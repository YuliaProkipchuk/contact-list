import { Component, computed, OnInit, signal } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { contacts } from '../../../data/contacts';
import { ContactInfo } from '../../../types/types';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-all-contacts',
  imports: [SearchFormComponent, RouterLink],
  templateUrl: './all-contacts.component.html',
})
export class AllContactsComponent implements OnInit {
  allContacts = signal<ContactInfo[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  limit = 5;
  skip = 1;
  currentPageContacts = computed(() => {
    this.skip = (this.currentPage() - 1) * this.limit;
    return this.allContacts().slice(this.skip, this.skip + this.limit);
  });

  ngOnInit(): void {
    let data = localStorage.getItem('contacts');
    if (!data) {
      const sorted: ContactInfo[] = contacts.sort((a: ContactInfo, b: ContactInfo) => a.firstName.localeCompare(b.firstName));
      localStorage.setItem('contacts', JSON.stringify(sorted));
      data = localStorage.getItem('contacts');
    }
    
    this.allContacts.set(JSON.parse(data as string))
    this.totalPages.set(Math.ceil(this.allContacts().length / this.limit))
  }
  receiveSearchResults($event: ContactInfo[]) {
    this.allContacts.set($event)
    this.totalPages.set(Math.ceil(this.allContacts().length / this.limit))

  }
  onNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(val => val + 1);
    }
  }
  onPrevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(val => val - 1)
    }
  }
  deleteContact(id: number) {
    let data = localStorage.getItem('contacts');
    let contacts: ContactInfo[] = (JSON.parse(data!) as ContactInfo[]).filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.allContacts.set(contacts)
    this.totalPages.set(Math.ceil(this.allContacts().length / this.limit))
    this.currentPage.set(1)

  }
}
