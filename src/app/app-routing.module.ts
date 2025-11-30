import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/contacts/admin', pathMatch: 'full'},
  {path: 'contacts/admin', component: ContactManagerComponent},
  {path: 'contacts/add', component: AddcontactComponent},
  {path: 'contacts/edit/:contactId', component: EditcontactComponent},
  {path: 'contacts/view/:contactId', component: ViewcontactComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
