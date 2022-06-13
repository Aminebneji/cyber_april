import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Component/header/header.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { LoginModaleComponent } from './Component/login-modale/login-modale.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './Component/login/login.component';
import { PcFormGetComponent } from './Component/pc-form-get/pc-form-get.component';



import { FooterComponent } from './Component/footer/footer.component';
import { CardOffreComponent } from './Component/card-offre/card-offre.component';

import { HttpClientModule } from '@angular/common/http';
import { PcFormComponent } from './Component/pc-form/pc-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminListComputerComponent } from './Component/admin-list-computer/admin-list-computer.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { RegisterComponent } from './Component/register/register.component';
import {MatTableModule} from '@angular/material/table';
import { FormReservComponent } from './form-reserv/form-reserv.component';
import { AdminMenuComponent } from './Component/admin-menu/admin-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { PcFormEditComponent } from './Component/pc-form-edit/pc-form-edit.component';
import { ReservClientComponent } from './Component/profile/reserv-client/reserv-client.component';
import { AdminListClientComponent } from './Component/admin-list-client/admin-list-client.component';
import { PcFormResrvationsComponent } from './Component/pc-form-resrvations/pc-form-resrvations.component';
import { PcFormEditResrvationsComponent } from './Component/pc-form-edit-resrvations/pc-form-edit-resrvations.component';
import { EditProfileComponent } from './Component/edit-profile/edit-profile.component';
import { NosPcComponent } from './Component/nos-pc/nos-pc.component';
import { LoginPageComponent } from './Component/login-page/login-page.component';
import { PageErrorComponent } from './Component/page-error/page-error.component';
import { AddReservAdminComponent } from './Component/add-reserv-admin/add-reserv-admin.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LoginModaleComponent,
    LoginComponent,
    FooterComponent,
    CardOffreComponent,
    AdminListComputerComponent,
    ProfileComponent,
    RegisterComponent,
    PcFormComponent,
    PcFormGetComponent,
    FormReservComponent,
    PcFormEditComponent,
    ReservClientComponent,
    AdminMenuComponent,
    PcFormEditComponent,
    AdminListClientComponent,
    EditProfileComponent,
    PcFormResrvationsComponent,
    PcFormEditResrvationsComponent,
    NosPcComponent,
    LoginPageComponent,
    PageErrorComponent,
    AddReservAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule, 
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
