
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: []
})
export class NoPageComponent {

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Whoops...';
  }
  goBack() {
    this.appService.redirect('/');
  }
}
