import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModels } from 'src/app/Models/userModels';
import { ReservationService } from 'src/app/Services/reservation.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pc-form-resrvations',
  templateUrl: './pc-form-resrvations.component.html',
  styleUrls: ['./pc-form-resrvations.component.scss']
})
export class PcFormResrvationsComponent implements OnInit {

  constructor(private userService: UserService, private reservService: ReservationService, private router: Router) { }
  currentUser!: userModels;
  userReservations: any;
  columnsToDisplay = ["id", "dateDebut", "dateFin", "PC", "Utilisateur", "actions"];
  ngOnInit(): void {
    if(localStorage.getItem("user") == null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      let userRole = JSON.parse(localStorage.getItem("user") as string).role;
      if(userRole != 0)
      {
        this.router.navigate(['/error/AccessDenied']);
      }
      else
      {
        this.reservService.getReservations().subscribe(data => {
          console.log(data);
          this.userReservations = data;
        });
      }
    }
    
    
  }

  onDeleteReservation(id: number) {
    if (confirm("Voulez-vous réellement supprimer cette réservation ?")) {
      this.reservService.deleteReservation(id).subscribe(res => {
        window.location.reload();
      });
    }
  }
  openFromEdit(id: number) {
    this.router.navigateByUrl(`/editReservation/${id}`);
  }
  AddReserv()
  {
    this.router.navigateByUrl("/addReservAdmin");
  }
}
