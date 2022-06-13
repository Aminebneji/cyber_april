import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { pcModel, ScreenResolution } from '../Models/pcModel';
import { reservationModel } from '../Models/reservationModel';
import { PCService } from '../Services/pc.service';
import { ReservationService } from '../Services/reservation.service';
import { UserService } from '../Services/user.service'; 

@Component({
  selector: 'app-form-reserv',
  templateUrl: './form-reserv.component.html',
  styleUrls: ['./form-reserv.component.scss'] 

})
export class FormReservComponent implements OnInit {


  reservationForm: any;

  constructor(private pcService: PCService, private userService: UserService, private reservService: ReservationService,private router : Router) {

    this.reservationForm = new FormGroup({

      PcType: new FormControl(),
      ScreenNumber: new FormControl(),
      ScreenType: new FormControl(),
      StartDate: new FormControl(),
      EndDate: new FormControl()

    })
  }
  screenType: any;
  submitPcList: any;

  ngOnInit(): void {
    if(localStorage.getItem("user") == null){
      this.router.navigate(['/login']);
    }
    else
    {
      this.screenType = Object.keys(ScreenResolution).filter(F => isNaN(Number(F)));
    }
  }

  OnSubmit() {
    switch (this.reservationForm.value.PcType) {
      case "Bureautique":
        {
          this.pcService.getPCByAll(0,8,0,parseInt(ScreenResolution[this.reservationForm.value.ScreenType]),this.reservationForm.value.ScreenNumber).subscribe(data => {
            let pcList = data;
            this.reservService.getReservationsByDate(this.reservationForm.value.StartDate, this.reservationForm.value.EndDate).subscribe(data => {
              let reservList = data;
              let availablePC :pcModel[] = [];
              for (let i = 0; i < pcList.length; i++) {
                if (reservList.find(x => x.idPC == pcList[i].id) == null) {
                  availablePC.push(pcList[i]);
                }
              }
              if (availablePC.length > 0) {
                let pc = availablePC[0];
                let userId = JSON.parse(localStorage.getItem('user') as string).id;
                let reservation = new reservationModel(0, userId, pc.id, this.reservationForm.value.StartDate, this.reservationForm.value.EndDate);
                console.log(reservation);
                this.reservService.createReservationUser(reservation).subscribe(data => {
                  console.log(data);
                });
              }
              else
              {
                alert("Aucun PC disponible");
              }
            });
          });
          break;
        }
      case "Gaming":
        {
          this.pcService.getPCByAll(1,16,1,parseInt(ScreenResolution[this.reservationForm.value.ScreenType]),this.reservationForm.value.ScreenNumber).subscribe(data => {
            let pcList = data;
            this.reservService.getReservationsByDate(this.reservationForm.value.StartDate, this.reservationForm.value.EndDate).subscribe(data => {
              let reservList = data;
              let availablePC :pcModel[] = [];
              for (let i = 0; i < pcList.length; i++) {
                if (reservList.find(x => x.idPC == pcList[i].id) == null) {
                  availablePC.push(pcList[i]);
                }
              }
              if (availablePC.length > 0) {
                let pc = availablePC[0];
                let userId = JSON.parse(localStorage.getItem('user') as string).id;
                let reservation = new reservationModel(0, userId, pc.id, this.reservationForm.value.StartDate, this.reservationForm.value.EndDate);
                console.log(reservation);
                this.reservService.createReservationUser(reservation).subscribe(data => {
                  console.log(data);
                });
              }
              else
              {
                alert("Aucun PC disponible");
              }
            });
          });
          break;
        }
      case "Creation":
        {
          this.pcService.getPCByAll(2,32,2,parseInt(ScreenResolution[this.reservationForm.value.ScreenType]),this.reservationForm.value.ScreenNumber).subscribe(data => {
            let pcList = data;
            this.reservService.getReservationsByDate(this.reservationForm.value.StartDate, this.reservationForm.value.EndDate).subscribe(data => {
              let reservList = data;
              let availablePC :pcModel[] = [];
              for (let i = 0; i < pcList.length; i++) {
                if (reservList.find(x => x.idPC == pcList[i].id) == null) {
                  availablePC.push(pcList[i]);
                }
              }
              if (availablePC.length > 0) {
                let pc = availablePC[0];
                let userId = JSON.parse(localStorage.getItem('user') as string).id;
                let reservation = new reservationModel(0, userId, pc.id, this.reservationForm.value.StartDate, this.reservationForm.value.EndDate);
                console.log(reservation);
                this.reservService.createReservationUser(reservation).subscribe(data => {
                  console.log(data);
                });
              }
              else
              {
                alert("Aucun PC disponible");
              }
            });
          });
          break;
        }
      case "Competition":
        {
          this.pcService.getPCByAll(3,64,3,parseInt(ScreenResolution[this.reservationForm.value.ScreenType]),this.reservationForm.value.ScreenNumber).subscribe(data => {
            let pcList = data;
            this.reservService.getReservationsByDate(this.reservationForm.value.StartDate, this.reservationForm.value.EndDate).subscribe(data => {
              let reservList = data;
              let availablePC :pcModel[] = [];
              for (let i = 0; i < pcList.length; i++) {
                if (reservList.find(x => x.idPC == pcList[i].id) == null) {
                  availablePC.push(pcList[i]);
                }
              }
              if (availablePC.length > 0) {
                let pc = availablePC[0];
                let userId = JSON.parse(localStorage.getItem('user') as string).id;
                let reservation = new reservationModel(0, userId, pc.id, this.reservationForm.value.StartDate, this.reservationForm.value.EndDate);
                console.log(reservation);
                this.reservService.createReservationUser(reservation).subscribe(data => {
                  console.log(data);
                });
              }
              else
              {
                alert("Aucun PC disponible");
              }
            });
          });
          break;
        }
    }
  }
}



