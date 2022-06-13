import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pcModel, ScreenResolution } from 'src/app/Models/pcModel';
import { reservationModel } from 'src/app/Models/reservationModel';
import { PCService } from 'src/app/Services/pc.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pc-form-edit-resrvations',
  templateUrl: './pc-form-edit-resrvations.component.html',
  styleUrls: ['./pc-form-edit-resrvations.component.scss']
})
export class PcFormEditResrvationsComponent implements OnInit {

  reservationForm: any;

  constructor(private pcService: PCService, private userService: UserService, private reservService: ReservationService, private route: ActivatedRoute, private router: Router) {

    this.reservationForm = new FormGroup({

      Id: new FormControl(),
      PcType: new FormControl(),
      ScreenNumber: new FormControl(),
      ScreenType: new FormControl(),
      StartDate: new FormControl(),
      EndDate: new FormControl()

    })
  }
  screenType: any;
  submitPcList: any;
  reservationTmp: any;

  ngOnInit(): void {
    if(localStorage.getItem("user") == null)
    {
      this.router.navigate(['/login']);
    }
    let userRole = JSON.parse(localStorage.getItem("user") as string).role;
    if(userRole != 0)
    {
      this.router.navigate(['/error/AccessDenied']);
    }
    this.screenType = Object.keys(ScreenResolution).filter(F => isNaN(Number(F)));

    let id = this.route.snapshot.params['id'];
  

    console.log(id);

    this.reservService.getReservation(id).subscribe(data=>{
      this.reservationTmp = data as any;
      console.log(this.reservationTmp);

      this.reservationForm.Id =this.reservationTmp.id;
      
      this.reservationForm.StartDate = this.reservationTmp.dateDebut;
      this.reservationForm.EndDate = this.reservationTmp.dateFin;
    })
  }

  OnSubmit() {
    let Id = this.reservationForm.value.Id == null ? this.reservationForm.Id : this.reservationForm.value.Id;
    // let PcType = this.reservationForm.value.PcType == null ? this.reservationForm.PcType : this.reservationForm.value.PcType;
    // let ScreenNumber = this.reservationForm.value.ScreenNumber == null ? this.reservationForm.ScreenNumber : this.reservationForm.value.ScreenNumber;
    // let ScreenType = this.reservationForm.value.ScreenType == null ? this.reservationForm.ScreenType : this.reservationForm.value.ScreenType;
    
    
    let StartDate = this.reservationForm.value.StartDate == null ? this.reservationForm.StartDate : this.reservationForm.value.StartDate;
    let EndDate = this.reservationForm.value.EndDate == null ? this.reservationForm.EndDate : this.reservationForm.value.EndDate;
  
    console.log(this.reservationForm.value.Id);

    let temp = new reservationModel(Id,this.reservationTmp.idUser,this.reservationTmp.idPC,StartDate, EndDate);
    console.log(temp);
    this.reservService.updateReservation(temp).subscribe(data => {
      console.log(data);
      this.router.navigate(['/listReservations']);
     });


  }

}
