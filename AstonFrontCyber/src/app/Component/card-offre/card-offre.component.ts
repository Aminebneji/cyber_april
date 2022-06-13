import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-offre',
  templateUrl: './card-offre.component.html',
  styleUrls: ['./card-offre.component.scss']
})
export class CardOffreComponent implements OnInit {

  @Input() specPC: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
