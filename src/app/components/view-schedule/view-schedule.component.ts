import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ScheduleService } from 'src/app/services/schedule.service';

import { IUserScheduleData, IScheduleTurn, IUserScheduleInfo } from 'src/app/models/scheduler.model';
import { IViewScheduleTable } from 'src/app/models/view-schedule-table.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit {

  displayedColumns: string[] = ['Day', 'Turn', 'Delete'];
  data: IViewScheduleTable[] = [];
  userData: any;

  allSchedule: IUserScheduleData[] = [];
  allScheduleData: IScheduleTurn[] = [];
  turnID: IUserScheduleInfo[] = [];

  isLoadingData: boolean;

  userBrowserLanguage = window.navigator.language;

  toasterOptions = {
    sucessMessage: 'Agendamento cancelado com sucesso',
    btnOK: 'OK',
    timeout: 5000,
    errorClass: ['error-toaster'],
    sucessClass: ['sucess-toaster']
  };

  constructor(
    private scheduleService: ScheduleService,
    private toasterService: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.isLoadingData = true;
    this.getUserSchedule();
  }

  getUserSchedule(): void {
    this.scheduleService.getUserSchedule().subscribe(response => {
      if (response.data.length) {
        this.allSchedule = [response];
        this.allSchedule.forEach(schedule => {
          schedule.data.forEach(userInfo => {
            this.turnID.push({
                idShift: userInfo.idShift,
                id: userInfo.id
              }
            );
          });
        });

        this.getUserSchedulerData();
      } else {
        this.isLoadingData = false;
        return;
      }
    });
  }

  getUserSchedulerData(): void {
    this.turnID.forEach(turnID => {
      this.scheduleService.getUserScheduleData(turnID.idShift).subscribe(idResponse => {
        if (idResponse?.data) {
          this.allScheduleData.push({
            begin: idResponse.data.begin,
            end: idResponse.data.end,
            id: turnID.id
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
      .locale(this.userBrowserLanguage)
      .format('LL');
  }

  deleteTurn(elm: IViewScheduleTable): void {
    if (elm) {
      this.scheduleService.deleteSchedule(elm.id).subscribe(res => {
        if (res) {
          this.toasterService.open(
            this.toasterOptions.sucessMessage,
            this.toasterOptions.btnOK, {
              duration: this.toasterOptions.timeout,
              panelClass: this.toasterOptions.sucessClass
          });
        }
      },
      (requestError: HttpErrorResponse) => {
        if (requestError.status === 400) {
          this.toasterService.open(
            requestError.error.errors,
            this.toasterOptions.btnOK, {
            duration: this.toasterOptions.timeout,
            panelClass: this.toasterOptions.errorClass
          });
        }
      });
    }
  }

  setTableData(): void {
    this.data = [];

    this.allScheduleData.forEach(scheduleData => {
      this.data.push({
        date: this.formattedDate(scheduleData.begin),
        times: `${this.formattedHour(scheduleData.begin)} as ${this.formattedHour(scheduleData.end)}`,
        id: scheduleData.id
      });
    });

    this.userData = new MatTableDataSource(this.data);
    this.isLoadingData = false;
  }
}
