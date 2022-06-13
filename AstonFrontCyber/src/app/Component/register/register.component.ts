import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { userModels, UserRole } from 'src/app/Models/userModels';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private auth: AuthService) { }

  email: string = "";
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  phoneNumber: string = "";
  password: string = "";
  confirmPassword: string = "";
  isValid = false;
  ngOnInit(): void {
    if (localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user") as string).role != 0) {
      this.router.navigate(['/error/AccessDenied']);
    }
  }
  testValid() {
    if (this.password == this.confirmPassword && this.password != "" && this.email != "" && this.firstName != "" && this.lastName != "" && this.userName != "" && this.phoneNumber != "") {
      this.isValid = true;
    }
  }


  register() {
    this.testValid();
    if (this.isValid) {
      this.auth.register(this.userName, this.password, this.firstName, this.lastName, this.email, this.phoneNumber).subscribe(data => {
        console.log(data);
        this.auth.login(this.userName, this.password).subscribe(data => {
          localStorage.removeItem("token");
          localStorage.setItem("token", data.token);
          localStorage.setItem("tokenFull", JSON.stringify(data));
          this.userService.getUserByToken().subscribe(data => {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data));
            console.log(data);
            this.auth.isLogged = true;
            this.router.navigate(['/']);
            window.location.reload();
          });
        });
      });
    }
  }
}

