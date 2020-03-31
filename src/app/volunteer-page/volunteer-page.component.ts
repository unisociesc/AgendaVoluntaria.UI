import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

import { ScheduleService } from '../services/schedule.service';

import { Schedule, ScheduleData, SchedulingDone } from '../models/scheduler.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { TableInfo } from '../models/tabel.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // TABLE
  selection = new SelectionModel<TableInfo>(true, []);
  displayedColumns: string[] = ['horarios', 'Turnos', 'Agendar'];
  tableInfo: TableInfo[];
  dataSource: any;

  // DATE
  moment = moment();
  actualDate = moment().locale('pt-BR').format('LL');
  date = this.moment;

  // PAGINATION
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;

  // SCHEDULE
  schedule: Schedule[] = [];
  newSchedule: ScheduleData[];
  allSchedule: ScheduleData[] = [];
  scheduleDone: SchedulingDone;

  constructor(
    private scheduleService: ScheduleService
  ) {
    this.initializeTable();
  }

  ngOnInit(): void {
    this.initializeTable();
    this.intializeNavigationTable();
    this.getAllSchedule();
    this.scheduleHandle();
  }

  getAllSchedule(): void {
    this.scheduleService.getAllSchedule().subscribe(scheduler => {
      if (scheduler) {
        scheduler.data.forEach(scheduleInfo => {
          this.newSchedule = [
            {
              dataInicio: scheduleInfo.begin.split('T').shift(),
              horarioInicio: scheduleInfo.begin.split('T').pop(),
              dataFim: scheduleInfo.end.split('T').shift(),
              horarioFim: scheduleInfo.end.split('T').pop(),
              maxVolunteer: scheduleInfo.maxVolunteer,
              totalVolunteers: scheduleInfo.totalVolunteers,
              id: scheduleInfo.id
            }
          ];

          this.allSchedule.push(...this.newSchedule);
        });
      }

      this.convertSchedule();
    });
  }

  convertSchedule(): void {
    console.log(this.allSchedule);
  }

  verifySchedulePage(pageEvent: PageEvent): void {
    if (
      this.paginator.hasNextPage() &&
      pageEvent.pageIndex >= 1 &&
      pageEvent.previousPageIndex >= 0) {

      this.scheduleHandle('add', pageEvent.pageIndex);
      this.dataSource.data.forEach(table => {
        table.data = this.actualDate;
      });

      this.selection.clear();
    }
    if (
      !this.paginator.hasPreviousPage() &&
      pageEvent.previousPageIndex >= 0
    ) {

      this.scheduleHandle('subtract', pageEvent.pageIndex);
      this.dataSource.data.forEach(table => {
        table.data = this.actualDate;
      });

      this.selection.clear();
    }
  }

  scheduledTimes(event): void {
    // Todos os horarios marcados
    this.selection.selected.forEach(res => {

    });
  }

  intializeNavigationTable(): void {
    this.pageSize = 1;
    this.pageIndex = 0;
    this.length = 276;
  }

  initializeTable(): void {
    this.dataSource = new MatTableDataSource<TableInfo>(this.tableInfo);
    this.tableInfo = [
      { horarios: '06:00 as 12:00', agendar: '', turno: 'Matutino', data: '' },
      { horarios: '12:00 as 18:00', agendar: '', turno: 'Vespertino', data: '' },
      { horarios: '18:00 as 24:00', agendar: '', turno: 'Noturno', data: '' },
      { horarios: '24:00 as 06:00', agendar: '', turno: 'Madrugada', data: '' }
    ];
  }

  scheduleHandle(modifyDate?: string, days?: number): any {
    if (modifyDate === 'add') {
      this.actualDate = moment()
        .add(days, 'day')
        .locale('pt-BR')
        .format('LL');

    } else if (modifyDate === 'subtract') {

      this.actualDate = moment()
        .subtract(days, 'day')
        .locale('pt-BR')
        .format('LL');
    } else {

      this.actualDate = moment()
        .locale('pt-BR')
        .format('LL');
    }

    return this.actualDate;
  }

  sendSchedules(): void {
  //   this.selection.selected.forEach(res => {
  //     this.scheduleDone = {
  //       idVolunteer: res.
  //     }
  //     this.scheduleService.sendSchedule()
  //     console.log(res);
  //   })
  // }
  }
}
