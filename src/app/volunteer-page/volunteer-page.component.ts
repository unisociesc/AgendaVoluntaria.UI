import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

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
export class VolunteerPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // TABLE
  selection = new SelectionModel<TableInfo>(true, []);
  displayedColumns: string[] = ['horarios', 'Turnos', 'Agendar'];
  displayTable: TableInfo[];
  dataSource;
  data;
  isLoadingResults: boolean;

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
  ) { }

  ngOnInit(): void {
    this.intializeNavigationTable();
    this.getAllSchedule();
    this.scheduleHandle();
  }

  ngAfterViewInit(): void {
    this.convertSchedule();
  }

  getAllSchedule(): void {
    this.isLoadingResults = true;
    this.scheduleService.getAllSchedule().subscribe(scheduler => {
      if (scheduler) {
        scheduler.data.forEach(scheduleInfo => {
          this.newSchedule = [
            {
              dataInicio: scheduleInfo.begin.split('T').shift(),
              horarioInicio: scheduleInfo.begin.split('T').pop().substr(0, 5),
              dataFim: scheduleInfo.end.split('T').shift(),
              horarioFim: scheduleInfo.end.split('T').pop().substr(0, 5),
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
    if (this.allSchedule.length) {
    console.log("VolunteerPageComponent -> convertSchedule -> this.allSchedule", this.allSchedule)

      console.log(this.allSchedule.shift().horarioInicio)
      console.log(moment(this.allSchedule.shift().horarioInicio).format('LT'))

      // this.allSchedule.filter(all => {
      //   all.dataInicio
      // })

      this.data = this.displayTable;
      this.dataSource = new MatTableDataSource(this.data);
      this.pageSize = 5;
    }
    this.isLoadingResults = false;
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
    this.pageSize = 5;
    this.pageIndex = 0;
    this.length = 276;
  }

  // initializeTable(): void {
  //   // this.dataSource = new MatTableDataSource<displayTable>(this.displayTable);
  //   this.displayTable = [
  //     { horarios: '06:00 as 12:00', agendar: '', turno: 'Matutino', data: '' },
  //     { horarios: '12:00 as 18:00', agendar: '', turno: 'Vespertino', data: '' },
  //     { horarios: '18:00 as 24:00', agendar: '', turno: 'Noturno', data: '' },
  //     { horarios: '24:00 as 06:00', agendar: '', turno: 'Madrugada', data: '' }
  //   ];
  // }

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
    this.selection.selected.forEach(res => {
  //     this.scheduleDone = {
  //       idVolunteer: res.
  //     }
  //     this.scheduleService.sendSchedule()
      console.log(res);
    })
  // }
  }
}
