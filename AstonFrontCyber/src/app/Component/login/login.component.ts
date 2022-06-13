import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { LoginModaleComponent } from '../login-modale/login-modale.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private DialogRef : MatDialog) { }

  OpenDialog(){ 
    this.DialogRef.open(LoginModaleComponent); 
  } 


}
