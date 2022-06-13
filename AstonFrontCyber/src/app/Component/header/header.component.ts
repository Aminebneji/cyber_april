import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginModaleComponent } from '../login-modale/login-modale.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private DialogRef : MatDialog,private authService : AuthService,private router : Router) { 
   
   }
   isLogged = false;
  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem("user")){
      this.authService.isLogged = true;
    }
    else
    {
      this.authService.isLogged = false;
    }
    this.isLogged = this.authService.isLogged;
  }

  ButtonHamburgerState(): void{
    let hamburger = document.querySelector('.hamburger') as HTMLElement;
    let mobile_menu = document.querySelector('.mobile-nav') as HTMLElement;
   
    hamburger.classList.toggle('is-active') ;
    mobile_menu.classList.toggle('is-active');
  }
  OpenDialog(){ 
    this.DialogRef.open(LoginModaleComponent); 
  } 
  GoToRegister()
  {
    this.router.navigate(['/register']);
  }
  GoToProfile()
  {
    this.router.navigate(['/profile']);
  }
  Logout()
  {
    this.authService.logout();
    window.location.reload();
  }
}
