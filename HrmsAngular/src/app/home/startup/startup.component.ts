import { Helper } from './../../shared/helper';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReportService } from '../../services/report.service';
import { AppStateService } from '../../services/app-state.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent implements OnInit{

  public response: string;

  _files:FileList;

  constructor(
    private http: HttpClient
    ) {}

    ngOnInit(){
    }
}
