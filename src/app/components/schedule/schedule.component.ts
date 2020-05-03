import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

import { ScheduleService } from '../../services/schedule.service';
import { LoginService } from '../../services/login.service';

import { Schedule, SchedulingDone } from '../../models/scheduler.model';
import { TableInfo } from '../../models/tabel.model';

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
  displayedColumns: string[] = ['horarios', 'Voluntários Atual/Max', 'Agendar'];
  displayTable: TableInfo[] = [];
  dataSource;
  data: any;
  isLoadingResults: boolean;
  checkDone: boolean;

  // DATE
  userBrowserLanguage: string;
  moment = moment();
  actualDate: any;
  date = this.moment;

  // PAGINATION
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;

  // SCHEDULE
  allSchedule: Schedule[] = [];
  scheduleDone: SchedulingDone;

  // User
  userID: string;

  constructor(
    private scheduleService: ScheduleService,
    private loginService: LoginService,
    private toaster: MatSnackBar,
    private window: Window
  ) { }

  ngOnInit(): void {
    this.userBrowserLanguage = this.window.navigator.language;
    this.actualDate = moment().locale(this.userBrowserLanguage).format('LL');

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
      this.getPagesNumber();
      this.initializeTableNavigation();

      this.allSchedule.map(data => {
        if (this.transformDate(data.date) === this.actualDate) {
          this.displayTable.push({
            data: this.transformDate(data.date),
            horarios: `${data.hours.begin} as ${data.hours.end}`,
            id: data.id,
            maxVolunteer: data.maxVolunteer,
            totalVolunteers: data.totalVolunteers,
            allVolunteers: `${data.totalVolunteers}/${data.maxVolunteer}`
          });
        }
      });

      this.data = this.displayTable;
      this.dataSource = new MatTableDataSource(this.data);
      this.isLoadingResults = false;
    }
  }

  transformDate(date: string): string {
    return moment(date).locale(this.userBrowserLanguage).format('LL');
  }

  getPagesNumber(): number {
    let page = 0;
    let actualDate;
    let pastDate;

    if (this.allSchedule?.length) {
      this.allSchedule.forEach(schedule => {
        actualDate = this.transformDate(schedule.date);

        if (actualDate !== pastDate) {
          pastDate = actualDate;
          page++;
        }
      });
    }

    return page;
  }

  schedulePaginator(pageEvent: PageEvent): void {
    if (
      this.paginator.hasNextPage() &&
      pageEvent?.pageIndex >= 1 &&
      pageEvent?.previousPageIndex >= 0) {

      this.scheduleHandle('add', pageEvent.pageIndex);

      this.updateScheduleTable();
      this.verifyWithCanNavegate();
      this.setTableData();

      this.checkDone = false;
      this.selection.clear();
    }
    if (
      !this.paginator.hasPreviousPage() &&
      pageEvent?.previousPageIndex >= 0
    ) {

      this.scheduleHandle('subtract', pageEvent.pageIndex);

      this.updateScheduleTable();
      this.verifyWithCanNavegate();
      this.setTableData();

      this.checkDone = false;
      this.selection.clear();
    }
  }

  updateScheduleTable(): void {
    this.dataSource.data = [];
    this.allSchedule.forEach(allData => {
      if (this.transformDate(allData.date) === this.actualDate) {
        this.dataSource.data.push({
          data: allData.date,
          id: allData.id,
          horarios: `${allData.hours.begin} as ${allData.hours.end}`,
          maxVolunteer: allData.maxVolunteer,
          totalVolunteers: allData.totalVolunteers,
          allVolunteers: `${allData.totalVolunteers}/${allData.maxVolunteer}`
        });
      }
    });
  }

  verifyWithCanNavegate(): void {
    let count = 1;
    let countDate = this.actualDate;

    this.allSchedule.forEach(allData => {
      if (this.transformDate(allData.date) !== countDate) {
        countDate = this.transformDate(allData.date);
        count += 1;
      }
    });

    this.length = count;
  }

  setTableData(): void {
    this.data = this.dataSource.data;
    this.dataSource = new MatTableDataSource(this.data);
  }

  scheduleCheckedHandle(event, elm): void {
    const oldElm = elm;

    this.selection.clear();

    if (event) {
      if (elm !== oldElm) {
        this.selection.toggle(elm);
        this.selection.isSelected(elm);
      } else {
        this.selection.toggle(elm);
      }
    }
  }

  initializeTableNavigation(): void {
      this.pageSize = 1;
      this.pageIndex = 0;
      this.length = this.getPagesNumber();
  }

  verifyMaxNumberVolunteers(): boolean {
    let max: boolean;

    this.dataSource.data.forEach(data => {
      if (data.maxVolunteer === data.totalVolunteers) {
        max = true;
      }
    });

    return max;
  }

  scheduleHandle(modifyDate?: string, days?: number): any {
    if (modifyDate === 'add') {
      this.actualDate = moment()
        .add(days, 'day')
        .locale(this.userBrowserLanguage)
        .format('LL');

    } else if (modifyDate === 'subtract') {

      this.actualDate = moment()
        .subtract(days, 'day')
        .locale(this.userBrowserLanguage)
        .format('LL');
    } else {

      this.actualDate = moment()
        .locale(this.userBrowserLanguage)
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
        .subscribe(data => {
          if (data) {
            this.toaster.open('Turno agendado com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['sucess-toaster']
            });
          }
        },
          (responseFail: HttpErrorResponse) => {
            if (responseFail.status === 400) {
              this.toaster.open(responseFail.error.errors, 'OK', {
                duration: 5000,
                panelClass: ['error-toaster']
              });
              return;
            }
            if (this.verifyMaxNumberVolunteers()) {
              this.toaster.open(responseFail.error.errors, 'OK', {
                duration: 5000,
                panelClass: ['error-toaster']
              });
            }
          }
        );
    });
  }
}
