import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {



  constructor(userService: UserService, authService: AuthService, private router: Router) { }

  state: boolean = false;
  // admin

  ngOnInit(): void {

    if (localStorage.getItem('user')) {
      let userState = JSON.parse(localStorage.getItem('user') as string).role;
      console.log(userState);

      if (userState != 0) {
        this.state = false;
      } else {
        this.state = true;
      };
    }
  }

  moveToAdminPC() {
    this.router.navigate(['/listPC']);
  }


}

