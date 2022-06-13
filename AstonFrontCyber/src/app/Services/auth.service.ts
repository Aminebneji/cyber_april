import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginReturn } from '../Models/loginReturn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AuthUrl = environment.apiUrl + 'Auth/';
  public isLogged = false;
  constructor(private http : HttpClient,private route : Router) { }
  headers = new HttpHeaders({
    "Access-Control-Allow-Origin": '*'
  });
  //Login with username+password and get token , store token in local storage
  login(email: string, password: string) : Observable<loginReturn> {
    return this.http.post<loginReturn>(this.AuthUrl + 'authenticate', { email, password },{headers: this.headers});
  }
  register(username: string, password: string, firstName: string, lastName: string, email: string, phoneNumber: string) {
    return this.http.post(this.AuthUrl + 'register', { username, password, firstName, lastName, email, phoneNumber },{headers: this.headers});
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenFull');
    localStorage.removeItem('user');
    this.isLogged = false;
    this.route.navigate(['/']);
  }
}
