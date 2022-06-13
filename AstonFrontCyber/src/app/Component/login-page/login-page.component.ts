import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  loginForm: any;
  loggedIn = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService,private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLogged;
    if(this.loggedIn){
      this.router.navigate(['/']);
    }
  }


  public login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenFull", JSON.stringify(data));
      this.userService.getUserByToken().subscribe(data => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        this.authService.isLogged = true;
        this.router.navigate(['/']);
        window.location.reload();
      });
    });
  }

  
}
