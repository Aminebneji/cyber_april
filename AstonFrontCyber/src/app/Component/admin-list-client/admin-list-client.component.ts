import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-list-client',
  templateUrl: './admin-list-client.component.html',
  styleUrls: ['./admin-list-client.component.scss']
})
export class AdminListClientComponent implements OnInit {

  user: any;
  columnsToDisplay = ['id', 'firstName', 'lastName', 'username', 'email', 'phoneNumber', 'role', 'createdAt', 'updatedAt', 'actions'];


  constructor(private UserService: UserService, private Router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("user") == null) {
      this.Router.navigate(['/login']);
    }
    let userRole = JSON.parse(localStorage.getItem("user") as string).role;
    if (userRole != 0) {
      this.Router.navigate(['/error/AccessDenied']);
    }
    this.UserService.getUsers().subscribe(data => {
      this.user = data

      console.log(this.user)
    })
  }

  DeleteUser(id: number) {
    this.UserService.deleteUser(id).subscribe(ret => {
      alert("Supprimé avec succes")
      window.location.reload();
    });
  }

  openFormEdit(id: number) {
    this.Router.navigateByUrl(`/editProfile/${id}`);
  }
  AddClient()
  {
    this.Router.navigateByUrl("/register");
  }

}
