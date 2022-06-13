import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private route: Router) { }

  messageToDisplay = "";
  ngOnInit(): void {
    if (this.actRoute.snapshot.params["message"] != null) {
      {
        this.messageToDisplay = this.actRoute.snapshot.params["message"];
      }
    }else
    {
      this.messageToDisplay = "Une erreur est survenue";
    }
  }
  GoHome() {
    this.route.navigate(['/']);
  }

}
