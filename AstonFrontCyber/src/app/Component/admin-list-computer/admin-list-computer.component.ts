import { Component, OnInit } from '@angular/core';
import { componentClass, ScreenResolution } from 'src/app/Models/pcModel';
import { PCService } from 'src/app/Services/pc.service';

@Component({
  selector: 'app-admin-list-computer',
  templateUrl: './admin-list-computer.component.html',
  styleUrls: ['./admin-list-computer.component.scss']
})
export class AdminListComputerComponent implements OnInit {

  constructor( private pcService: PCService ) { }

 PcList:any ;
 TabComp:any ; 
 TabScreen:any ;  
  ngOnInit(): void { 
   
   this.pcService.getPCs().subscribe(data =>{ 
     console.log(data)
     this.PcList = data; 

     });

     this.TabComp = Object.keys(componentClass).filter (f =>isNaN(Number(f))) ; 
     console.log(this.TabComp);
     this.TabScreen = Object.keys(ScreenResolution).filter (f =>isNaN(Number(f)));  
  }



}
