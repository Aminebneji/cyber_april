import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { componentClass, pcModel, ScreenResolution } from 'src/app/Models/pcModel';
import { PCService } from 'src/app/Services/pc.service';

@Component({
  selector: 'app-pc-form-edit',
  templateUrl: './pc-form-edit.component.html',
  styleUrls: ['./pc-form-edit.component.scss']
})
export class PcFormEditComponent implements OnInit {

  pcForm: any;
  constructor(private pcservice: PCService, private router: Router, private route: ActivatedRoute) {

    this.pcForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      serial: new FormControl(),
      pcImage: new FormControl(),
      cpu: new FormControl(),
      ramCapacity: new FormControl(),
      gpu: new FormControl(),
      screen: new FormControl(),
      screenAmount: new FormControl(),
      price: new FormControl(),
    });
  }

  onSubmit() {
    let pcName = this.pcForm.value.name == null ? this.pcForm.name : this.pcForm.value.name;
    let pcSerial = this.pcForm.value.serial == null ? this.pcForm.serial : this.pcForm.value.serial;
    let pcImage = this.pcForm.value.pcImage == null ? this.pcForm.pcImage : this.pcForm.value.pcImage;
    let cpu = this.pcForm.value.cpu == null ? this.pcForm.cpu : parseInt(this.gpuCpuList[this.pcForm.value.cpu]);
    let ramCapacity = this.pcForm.value.ramCapacity == null ? this.pcForm.ramCapacity : this.pcForm.value.ramCapacity;
    let gpu = this.pcForm.value.gpu == null ? this.pcForm.gpu : parseInt(this.gpuCpuList[this.pcForm.value.gpu]);
    let screen = this.pcForm.value.screen == null ? this.pcForm.screen : parseInt(this.screenResolution[this.pcForm.value.screen]);
    let screenAmount = this.pcForm.value.screenAmount == null ? this.pcForm.screenAmount : this.pcForm.value.screenAmount;
    let price = this.pcForm.value.price == null ? this.pcForm.price : this.pcForm.value.price;
    let id = this.pcForm.value.id == null ? this.pcForm.id : this.pcForm.value.id;
    let temp = new pcModel(id, pcName, pcSerial, cpu, ramCapacity, gpu, screen, screenAmount, price, pcImage);
    console.log(temp);
    this.pcservice.updatePC(temp).subscribe(data => {
      this.router.navigate(['/listPC']);
    });
  }
  gpuCpuList = componentClass;
  screenResolution = ScreenResolution;
  compoClass: any;
  screenRes: any;
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
    this.compoClass = Object.keys(this.gpuCpuList).filter(f => isNaN(Number(f)));
    this.screenRes = Object.keys(this.screenResolution).filter(f => isNaN(Number(f)));

    let id = this.route.snapshot.params['id'];
    this.pcservice.getPC(id).subscribe(data => {
      this.pcForm.id = data.id;
      this.pcForm.name = data.name;
      this.pcForm.serial = data.serial;
      this.pcForm.pcImage = data.pcImage;
      this.pcForm.cpu = data.cpu;
      this.pcForm.ramCapacity = data.ramCapacity;
      this.pcForm.gpu = data.gpu;
      this.pcForm.screen = data.screen;
      this.pcForm.screenAmount = data.screenAmount;
      this.pcForm.price = data.price;
    })

  }
}
