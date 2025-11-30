import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactManagerComponent,
    AddcontactComponent,
    EditcontactComponent,
    SpinnerComponent,
    ViewcontactComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
