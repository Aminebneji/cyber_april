import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModels } from 'src/app/Models/userModels';
import { ReservationService } from 'src/app/Services/reservation.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reserv-client',
  templateUrl: './reserv-client.component.html',
  styleUrls: ['./reserv-client.component.scss']
})
export class ReservClientComponent implements OnInit {

  constructor(private userService: UserService, private reservService: ReservationService, private route: Router) { }
  currentUser!: userModels;
  userReservations: any;
  columnsToDisplay = ["id", "dateDebut", "dateFin", "PC", "Utilisateur", "Price", "actions"];
  ngOnInit(): void {
    if (localStorage.getItem("user") == null) {
      this.route.navigate(['/login']);
    }
    else {
      this.userService.getUserByToken().subscribe(data => {
        this.currentUser = data;
        this.reservService.getReservationsByUser(this.currentUser.id).subscribe(data => {
          this.userReservations = data;
          console.log(this.userReservations);
          for (let i = 0; i < this.userReservations.length; i++) {
            let date1 = new Date(this.userReservations[i].dateDebut);
            let date2 = new Date(this.userReservations[i].dateFin);
            //Number of hour difference between the two dates
            let Difference_In_Time = date2.getTime() - date1.getTime();
            //Convert msec to hours and minutes
            let Difference_In_Hours = Difference_In_Time / (1000 * 3600);
            console.log(Difference_In_Hours);
            this.userReservations[i].TimeReserv = Difference_In_Hours;
          }
        });
      });
    }

  }

  onDeleteReservation(id: number) {
    let dateCurrent = new Date();
    let reservToDelete: any;
    for (let i = 0; i < this.userReservations.length; i++) {
      if (this.userReservations[i].id == id) {
        reservToDelete = this.userReservations[i];
      }
    }
    let dateToTest: Date = new Date(reservToDelete.dateFin);
    console.log(dateToTest);
    console.log(dateCurrent);
    if (dateCurrent.getTime() < dateToTest.getTime()) {
      this.reservService.deleteReservationUser(id).subscribe(res => {
        window.location.reload();
      });
    } else {
      alert("Vous ne pouvez pas annuler cette réservation");
    }
  }

}
