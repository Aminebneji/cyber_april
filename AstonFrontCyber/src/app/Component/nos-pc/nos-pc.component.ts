import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nos-pc',
  templateUrl: './nos-pc.component.html',
  styleUrls: ['./nos-pc.component.scss']
})
export class NosPcComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  RedirectToReserv()
  {
    this.router.navigate(['/addReserv']);
  }

}
