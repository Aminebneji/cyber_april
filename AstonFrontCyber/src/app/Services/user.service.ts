import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userModels } from '../Models/userModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl = environment.apiUrl + "Users";
  constructor(private http:HttpClient) { }
  headers = new HttpHeaders({
    "Authorization": 'Bearer ' + localStorage.getItem('token'),
    "Access-Control-Allow-Origin": '*'
  });
  //Crud
  //Read
  getUser(id: number) : Observable<userModels> {
    return this.http.get<userModels>(this.UserUrl + '/' + id,{headers: this.headers});
  }
  //ReadAll
  getUsers() : Observable<userModels[]> {
    return this.http.get<userModels[]>(this.UserUrl,{headers: this.headers});
  }
  //Update
  updateUser(user: userModels) {
    return this.http.put(this.UserUrl + '/' + user.id, user,{headers: this.headers});
  }
  //Delete
  deleteUser(id: number) {
    return this.http.delete(this.UserUrl + '/' + id,{headers: this.headers});
  }
  //Update withToken
  updateUserToken(user: userModels) {
    return this.http.put(this.UserUrl  + "/"+ user.id + '/token', user,{headers: this.headers});
  }
 
  //Get User by tokenId
  getUserByToken() : Observable<userModels>{
    let newHeaders = new HttpHeaders({
      "Authorization": 'Bearer ' + localStorage.getItem('token'),
      "Access-Control-Allow-Origin": '*'
    });
    console.log(newHeaders);
    return this.http.get<userModels>(this.UserUrl  + "/GetUserByTokenId",{headers: newHeaders});
  }

}
