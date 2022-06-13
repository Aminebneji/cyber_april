import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { componentClass, pcModel, ScreenResolution } from 'src/app/Models/pcModel';
import { PCService } from 'src/app/Services/pc.service';

@Component({
  selector: 'app-pc-form-get',
  templateUrl: './pc-form-get.component.html',
  styleUrls: ['./pc-form-get.component.scss']
})
export class PcFormGetComponent implements OnInit {

  pcs: any;
  columnsToDisplay = ['id', 'name', 'serial', 'cpu', 'ramCapacity', 'gpu', 'screen', 'screenAmount', 'price', 'pcImage', 'actions'];

  constructor(private pcservice: PCService, private router: Router) { 
    this.pcservice.getPCs().subscribe(data =>{
      this.pcs = data
       console.log(this.pcs);
    });

  }

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
    }
    
  }

  cpuGpuName(index: any){
    return componentClass[index]
  }
  
  screenName(index: any){
    return ScreenResolution[index]
  }

  onDeletePC(id:number){
    this.pcservice.deletePC(id).subscribe(res=>{
      console.log("Supprimer avec succès");
    });
  }

  openFromEdit(id:number){
    this.router.navigateByUrl(`/editPC/${id}`);
  }
  AddPC()
  {
    this.router.navigateByUrl("/addPC");
  }
}

 