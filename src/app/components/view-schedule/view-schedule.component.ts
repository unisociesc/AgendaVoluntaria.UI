import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ScheduleService } from 'src/app/services/schedule.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Day', 'Turn', 'Delete'];
  userData;

  isLoadingData;

  users = [
    { date: '10/10/2020', times: '05:00 as 20:00' },
    { date: '11/10/2020' }
  ];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.setTableData();
  }

  ngAfterViewInit(): void {
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
    this.userData = new MatTableDataSource(this.users);
  }
}
