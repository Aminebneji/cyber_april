import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/Services/auth.service';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { UserService } from 'src/app/Services/user.service';
import { UserRole } from 'src/app/Models/userModels';
@Component({
  selector: 'app-login-modale',
  templateUrl: './login-modale.component.html',
  styleUrls: ['./login-modale.component.scss']

})
export class LoginModaleComponent implements OnInit {

  loginForm: any;
  loggedIn = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLogged;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenFull", JSON.stringify(data));
      this.userService.getUserByToken().subscribe(data => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        this.authService.isLogged = true;
        window.location.reload();
      });
    });
  }
}
