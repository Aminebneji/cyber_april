import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userModels } from 'src/app/Models/userModels';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  currentUser!: userModels;
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  password: string = "";
  phoneNumber: string = "";
  confirmPassword: string = "";
  email: string = "";

  ngOnInit(): void {

    if (localStorage.getItem("user") == null) {
      this.route.navigate(['/login']);
    }
    else {
      this.userService.getUserByToken().subscribe(data => {
        this.currentUser = data;
        this.firstName = this.currentUser.firstName;
        this.lastName = this.currentUser.lastName;
        this.userName = this.currentUser.username;
        this.phoneNumber = this.currentUser.phoneNumber;
        this.email = this.currentUser.email;
      });
    }


  }

  updateUser() {
    this.currentUser.firstName = this.firstName;
    this.currentUser.lastName = this.lastName;
    this.currentUser.username = this.userName;
    this.currentUser.phoneNumber = this.phoneNumber;
    this.currentUser.email = this.email;
    this.currentUser.updatedAt = new Date();
    this.currentUser.HashPass = "empty";
    this.currentUser.SaltPass = "empty";
    console.log(this.currentUser);
    if (this.password != this.confirmPassword) {
      alert("Password and Confirm Password are not the same");
      return;
    }
    this.userService.updateUserToken(this.currentUser).subscribe(data => {
      console.log(data);
    });
  }
}
