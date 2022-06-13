import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOffreComponent } from './Component/card-offre/card-offre.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { PcFormEditComponent } from './Component/pc-form-edit/pc-form-edit.component';
import { PcFormGetComponent } from './Component/pc-form-get/pc-form-get.component';
import { PcFormComponent } from './Component/pc-form/pc-form.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { ReservClientComponent } from './Component/profile/reserv-client/reserv-client.component';
import { RegisterComponent } from './Component/register/register.component';
import { FormReservComponent } from './form-reserv/form-reserv.component';
import { AdminListClientComponent } from './Component/admin-list-client/admin-list-client.component';
import { PcFormResrvationsComponent } from './Component/pc-form-resrvations/pc-form-resrvations.component';
import { PcFormEditResrvationsComponent } from './Component/pc-form-edit-resrvations/pc-form-edit-resrvations.component';
import { EditProfileComponent } from './Component/edit-profile/edit-profile.component';
import { NosPcComponent } from './Component/nos-pc/nos-pc.component';
import { LoginPageComponent } from './Component/login-page/login-page.component';
import { PageErrorComponent } from './Component/page-error/page-error.component';
import { AddReservAdminComponent } from './Component/add-reserv-admin/add-reserv-admin.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'offre',component: NosPcComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'addPC', component: PcFormComponent},
  {path: 'addReserv',component:FormReservComponent},
  {path: 'listPC', component: PcFormGetComponent},
  {path: 'addReservAdmin',component:AddReservAdminComponent},
  {path: 'editPC/:id', component: PcFormEditComponent},
  {path: 'profile/reserv', component: ReservClientComponent},
  {path: 'listReservations', component: PcFormResrvationsComponent},
  {path: 'editReservation/:id', component: PcFormEditResrvationsComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'editPC/:id', component: PcFormEditComponent},  
  {path : 'listUserAdmin', component: AdminListClientComponent}, 
  {path : 'editProfile/:id' , component : EditProfileComponent}, 
  {path : 'error/:message',component: PageErrorComponent},
  {path : 'error/',component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
