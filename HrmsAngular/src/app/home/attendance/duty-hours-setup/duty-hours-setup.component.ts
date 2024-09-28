import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duty-hours-setup',
  templateUrl: './duty-hours-setup.component.html',
  styleUrls: ['./duty-hours-setup.component.scss']
})
export class DutyHoursSetupComponent extends Pagination implements OnInit {

  constructor() {
    super();
  }
  title="Faculty Duty Hours Setup";
  ngOnInit() {
    this.items = [1,2,3,6,7,8,9,3,4,65,67];
    this.update();
  }

}
