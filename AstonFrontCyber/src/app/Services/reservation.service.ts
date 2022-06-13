import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { reservationModel } from '../Models/reservationModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private ReservationUrl =environment.apiUrl +"Reservations";
  
  constructor(private http : HttpClient) { }
  headers = new HttpHeaders({
    "Authorization": 'Bearer ' + localStorage.getItem('token'),
    "Access-Control-Allow-Origin": '*'
  });
  ///CRUD 
  //Create
  createReservation(reservation: reservationModel) {
    return this.http.post(this.ReservationUrl, reservation,{headers: this.headers});
  }
  createReservationUser(reservation: reservationModel) {
    return this.http.post(this.ReservationUrl+"/usermade", reservation,{headers: this.headers});
  }
  deleteReservationUser(id: number) {
    return this.http.delete(this.ReservationUrl + '/usermade/' + id,{headers: this.headers});
  }
  //Read
  getReservation(id: number) : Observable<reservationModel> {
    return this.http.get<reservationModel>(this.ReservationUrl + '/' + id,{headers: this.headers});
  }
  //ReadAll
  getReservations() : Observable<reservationModel[]> {
    return this.http.get<reservationModel[]>(this.ReservationUrl,{headers: this.headers});
  }
  //Update
  updateReservation(reservation: reservationModel) {
    return this.http.put(this.ReservationUrl + '/' + reservation.id, reservation,{headers: this.headers});
  }
  //Delete
  deleteReservation(id: number) {
    return this.http.delete(this.ReservationUrl + '/' + id,{headers: this.headers});
  }

  //Custom
  getReservationsByUser(id: number) : Observable<reservationModel[]> {
    return this.http.get<reservationModel[]>(this.ReservationUrl + '/User/' + id,{headers: this.headers});
  }
  getReservationsByPc(id: number) : Observable<reservationModel[]>{
    return this.http.get<reservationModel[]>(this.ReservationUrl + '/PC/' + id,{headers: this.headers});
  }
  getReservationsByDate(startDate: Date, endDate: Date): Observable<reservationModel[]> {
    return this.http.get<reservationModel[]>(this.ReservationUrl + '/BetweenDates/' + startDate + '/' + endDate,{headers: this.headers});
  }
  getReservationByStartDate(startDate: Date): Observable<reservationModel[]> {
    return this.http.get<reservationModel[]>(this.ReservationUrl + '/StartDate/' + startDate,{headers: this.headers});
  }
  getReservationByEndDate(endDate: Date) : Observable<reservationModel[]>{
    return this.http.get<reservationModel[]>(this.ReservationUrl + '/EndDate/' + endDate,{headers: this.headers});
  }

}
