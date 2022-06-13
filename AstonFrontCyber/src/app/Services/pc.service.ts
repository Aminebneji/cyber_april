import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pcModel } from '../Models/pcModel';


@Injectable({
  providedIn: 'root'
})
export class PCService {

  private PCUrl = environment.apiUrl+'PCs';
  constructor(private http : HttpClient) { }
  headers = new HttpHeaders({
    "Authorization": 'Bearer ' + localStorage.getItem('token'),
    "Access-Control-Allow-Origin": '*'
  });
  //Create
  createPC(pc: pcModel) :Observable<pcModel>{
    return this.http.post<pcModel>(this.PCUrl, pc,{headers: this.headers});
  }
  //Read
  getPC(id: number) : Observable<pcModel> {
    return this.http.get<pcModel>(this.PCUrl + '/' + id,{headers: this.headers});
  }
  //ReadAll
  getPCs() : Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl,{headers: this.headers});
  }
  //Update
  updatePC(pc: pcModel) {
    return this.http.put(this.PCUrl + '/' + pc.id, pc,{headers: this.headers});
  }
  //Delete
  deletePC(id: number) {
    return this.http.delete(this.PCUrl + '/' + id,{headers: this.headers});
  }
  //Custom
  //GetPc BY cpu
  getPCByCpu(cpu: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/cpu/' + cpu,{headers: this.headers});
  }
  getPCByRam(ram: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/ram/' + ram,{headers: this.headers});
  }
  getPCByGpu(gpu: number) : Observable<pcModel[]>{
    return this.http.get<pcModel[]>(this.PCUrl + '/gpu/' + gpu,{headers: this.headers});
  }
  getPCbyScreen(screen: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/screen/' + screen,{headers: this.headers});
  }
  getPCbyScreenAmount(screenAmount: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/screenNb/' + screenAmount,{headers: this.headers});
  }
  getPCbyScreenAmountAndScreen(screenAmount: number, screen: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/screenDetails/' + screenAmount + '/' + screen,{headers: this.headers});
  }
  getPCByAll(cpu: number, ram: number, gpu: number, screen: number, screenAmount: number): Observable<pcModel[]> {
    return this.http.get<pcModel[]>(this.PCUrl + '/fullDetails/' + cpu + '/' + ram + '/' + gpu + '/' + screen + '/' + screenAmount,{headers: this.headers});
  }
}
