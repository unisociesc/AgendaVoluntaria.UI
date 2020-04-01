import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

import { ScheduleService } from '../services/schedule.service';
import { LoginService } from '../services/login.service';

import { Schedule, ScheduleData, SchedulingDone } from '../models/scheduler.model';
import { TableInfo } from '../models/tabel.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // TABLE
  selection = new SelectionModel<TableInfo>(true, []);
  displayedColumns: string[] = ['horarios', 'Agendar'];
  displayTable: TableInfo[] = [];
  dataSource;
  data: any;
  isLoadingResults: boolean;
  checkDone: boolean;

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
  allSchedule: Schedule[] = [];
  scheduleDone: SchedulingDone;
  scheduleElm = [];

  // User
  userID: string;

  constructor(
    private scheduleService: ScheduleService,
    private loginService: LoginService
  ) { }
  ngOnInit(): void {
    this.saveUserJWT();
    this.getScheduler();
    this.scheduleHandle();
    this.initializeTableNavigation();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.populateTableWithSchedulers();
      this.initializeTableNavigation();
    }
  }

  saveUserJWT(): void {
    this.userID = this.loginService.getUserInfoJWT();
  }

  getScheduler(): void {
    this.isLoadingResults = true;
    this.scheduleService.getSchedule(15).subscribe(scheduler => {
      if (scheduler) {
        scheduler.data.forEach(scheduleInfo => {
          this.allSchedule.push(scheduleInfo);
        });
      }

      this.populateTableWithSchedulers();
    });
  }

  populateTableWithSchedulers(): void {
    if (this.allSchedule) {
      this.allSchedule.forEach(date => {
        if (moment(date.date).locale('pt-BR').format('LL') === this.actualDate) {

          this.displayTable.push({
            data: moment(date.date).locale('pt-BR').format('LL'),
            horarios: `${date.hours.begin} as ${date.hours.end}`,
            id: date.id
          });
        }
      });

      this.data = this.displayTable;
      this.dataSource = new MatTableDataSource(this.data);
      this.isLoadingResults = false;
    }
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

      this.checkDone = false;
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

      this.checkDone = false;
      this.selection.clear();
    }
  }

  scheduleCheckedHandle(event, elm): void {
    if (event) {
      this.selection.toggle(elm);
    } else {
      event = null;
      this.selection.deselect(elm);
    }

    if (event.source.checked) {
      this.checkDone = true;
    }
  }

  initializeTableNavigation(): void {
    this.pageSize = 1;
    this.pageIndex = 0;
    this.length = 15;
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
   this.selection.selected.forEach(res => {
      this.scheduleDone = {
        idShift: res.id,
        idUser: this.userID
      };
      this.scheduleService.sendSchedule(this.scheduleDone)
        .subscribe();
   });
  }
}
