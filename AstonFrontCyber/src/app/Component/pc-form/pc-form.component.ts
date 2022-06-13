import { Component, OnInit } from '@angular/core';
import { PCService } from 'src/app/Services/pc.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, RequiredValidator, NgForm } from '@angular/forms'
import { componentClass, pcModel, ScreenResolution } from 'src/app/Models/pcModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pc-form',
  templateUrl: './pc-form.component.html',
  styleUrls: ['./pc-form.component.scss']
})

export class PcFormComponent implements OnInit {
  
 
  pcForm: any;

  constructor(private pcservice: PCService, private router: Router) {
    this.pcForm = new FormGroup({
      name: new FormControl(),
      serial: new FormControl(),
      pcImage : new FormControl(),
      cpu: new FormControl(),
      ramCapacity: new FormControl(),
      gpu: new FormControl(),
      screen: new FormControl(),
      screenAmount: new FormControl(),
      price: new FormControl(),
    });
  }

  onSubmit(){ 
    if(this.pcForm.valid){
    let temp = new pcModel( 0,this.pcForm.value.name, this.pcForm.value.serial, parseInt(this.gpuCpuList[this.pcForm.value.cpu]), this.pcForm.value.ramCapacity, parseInt(this.gpuCpuList[this.pcForm.value.gpu]), parseInt(this.screenResolution[this.pcForm.value.screen]), this.pcForm.value.screenAmount, this.pcForm.value.price, this.pcForm.value.pcImage);
    console.log(temp);
    this.pcservice.createPC(temp).subscribe(data =>{
      console.log(data);
    });

    this.router.navigate(['/listPC']);
  }} 
  
  gpuCpuList = componentClass;
  screenResolution = ScreenResolution;
  compoClass :any;
  screenRes :any;
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
    this.compoClass = Object.keys(this.gpuCpuList).filter (f =>isNaN(Number(f)));
    this.screenRes = Object.keys(this.screenResolution).filter (f =>isNaN(Number(f)));
  }

  resetForm(){

  }
} 
  



