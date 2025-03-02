import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactInfo } from '../../../types/types';
@Component({
  selector: 'app-search-form',
  imports: [FormsModule],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  searchTerm = ''
  data = output<ContactInfo[]>()
  onSubmit() {
    const searchResults = this.searchContact(this.searchTerm)
    this.data.emit(searchResults)
  }
  searchContact(q: string): ContactInfo[] {
    const data = localStorage.getItem('contacts');
    if (data) {
      const contacts: ContactInfo[] = JSON.parse(data);
      if (q.trim() === '') return contacts;
      else return contacts.filter((contact) => 
        contact.firstName.toLowerCase().includes(q.toLowerCase()) || 
        contact.lastName.toLowerCase().includes(q.toLowerCase()) || 
        contact.phone.includes(q)
      );
    } else {
      return []
    }
  }
}
