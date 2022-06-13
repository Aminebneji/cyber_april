import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { userModels } from 'src/app/Models/userModels';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService, private ActRouter: ActivatedRoute,private router : Router) { }

  currentUser!: userModels;
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  password: string = "";
  phoneNumber: string = "";
  confirmPassword: string = "";
  email: string = "";

  ngOnInit(): void {

  let id = this.ActRouter.snapshot.params["id"]; 
  if(localStorage.getItem("user") == null)
  {
    this.router.navigate(['/login']);
  }
  let userRole = JSON.parse(localStorage.getItem("user") as string).role;
  if(userRole != 0)
  {
    this.router.navigate(['/error/AccessDenied']);
  }
    this.userService.getUser(id).subscribe(data => {
      this.currentUser = data;
      this.firstName = this.currentUser.firstName;
      this.lastName = this.currentUser.lastName;
      this.userName = this.currentUser.username;
      this.phoneNumber = this.currentUser.phoneNumber;
      this.email = this.currentUser.email;
    });
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

    this.userService.updateUser(this.currentUser).subscribe(data => {
      console.log(data);
    });
  }
}
