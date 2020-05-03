import { Component, OnInit } from '@angular/core';

import { ScheduleDetailsService } from 'src/app/services/schedule-details.service';

import { IScheduleDetails } from 'src/app/models/schedule-details.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-view-schedule-details',
  templateUrl: './view-schedule-details.component.html',
  styleUrls: ['./view-schedule-details.component.scss']
})
export class ViewScheduleDetailsComponent implements OnInit {

  shifts: IScheduleDetails[] = [];

  isLoadingData: boolean;
  dias = 15;
  // userBrowserLanguage = window.navigator.language;

  constructor(
    private scheduleService: ScheduleDetailsService
    ) {}

  ngOnInit(): void {
    this.isLoadingData = true;
    this.getScheduleDetails();
  }

  getScheduleDetails(): void {
    this.scheduleService.getShiftsDetails(this.dias).subscribe(response => {
      if (response.data.length) {
        this.shifts = response.data;
        this.shifts.forEach(x => x.date = this.formattedDate(x.date));
      }

      this.isLoadingData = false;
    });
  }

  formattedDate(date: string) {
    return moment(date)
      .locale('pt-BR')
      .format('LL');
  }
}
