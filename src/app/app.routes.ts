import { Routes } from '@angular/router';
import { AllContactsComponent } from './pages/all-contacts/all-contacts.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ContactInfoPageComponent } from './pages/contact-info-page/contact-info-page.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AllContactsComponent,
        title:'Home'
    },
    {
        path: 'new-contact',
        component: NewContactComponent,
        title:'New Contact'
    },
    {
        path: 'contacts/:id',
        component: ContactInfoPageComponent,
        children: [
            {
                path:'',
                pathMatch:'full',
                component:ContactDetailsComponent
            },
            {
                path: 'edit',
                component: EditContactComponent,
                title:"Edit Contact"
            }
        ]
    },
    {
        path:'**',
        redirectTo:''
    }

];
