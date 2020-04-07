import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ScheduleService } from 'src/app/services/schedule.service';

import { IUserScheduleData, IScheduleTurn } from 'src/app/models/scheduler.model';
import { IViewScheduleTable } from 'src/app/models/view-schedule-table.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit {

  displayedColumns: string[] = ['Day', 'Turn'];
  data: IViewScheduleTable[] = [];
  userData: any;

  allSchedule: IUserScheduleData[] = [];
  allScheduleData: IScheduleTurn[] = [];
  turnID: string[] = [];

  isLoadingData: boolean;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.isLoadingData = true;
    this.getUserSchedule();
  }

  getUserSchedule(): void {
    this.scheduleService.getUserSchedule().subscribe(response => {
      if (response) {
        this.allSchedule = [response];
        this.allSchedule.forEach(schedule => {
          schedule.data.forEach(userInfo => {
            this.turnID.push(userInfo.idShift);
          });
        });

        this.getUserSchedulerData();
      }
    });
  }

  getUserSchedulerData(): void {
    this.turnID.forEach(turnID => {
      this.scheduleService.getUserScheduleData(turnID).subscribe(idResponse => {
        if (idResponse?.data) {
          this.allScheduleData.push({
            begin: idResponse.data.begin,
            end: idResponse.data.end,
            id: idResponse.data.id
          });
        }
        this.setTableData();
      });
    });
  }

  formattedHour(hours: string) {
    return moment(hours).format('LT');
  }

  formattedDate(date: string) {
    return moment(date)
      .locale('pt-BR')
      .format('LL');
  }

  deleteTurn(elm): void {
    this.scheduleService.deleteSchedule(elm);
  }

  setTableData(): void {
    this.data = [];

    this.allScheduleData.forEach(scheduleData => {
      this.data.push({
        date: this.formattedDate(scheduleData.begin),
        times: `${this.formattedHour(scheduleData.begin)} as ${this.formattedHour(scheduleData.end)}`
      });
    });

    this.userData = new MatTableDataSource(this.data);
    this.isLoadingData = false;
  }
}
