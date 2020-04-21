import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PsychologistService } from 'src/app/services/psychologist.service';

import { IVolunteerNeedPsychologist } from 'src/app/models/psychologist.model';
import { IViewVolunteerNeedPsychologistTable } from 'src/app/models/view-psychologist-table.model';

@Component({
  selector: 'app-view-psychologist',
  templateUrl: './view-psychologist.component.html',
  styleUrls: ['./view-psychologist.component.scss']
})
export class ViewPsychologistComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Details', 'Help'];
  
  data: IViewVolunteerNeedPsychologistTable[] = [];
  userData: any;

  allVolunteersNeedPsychologist: IVolunteerNeedPsychologist[] = [];

  isLoadingData: boolean;

  toasterOptions = {
    sucessMessage: 'Atendimento realizado com sucesso',
    btnOK: 'OK',
    timeout: 5000,
    errorClass: ['error-toaster'],
    sucessClass: ['sucess-toaster']
  };

  constructor(
    private psychologistService: PsychologistService,
    private toasterService: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.isLoadingData = true;
    this.getVolunteersNeedPsychologist();
  }

  getVolunteersNeedPsychologist(): void {
    this.psychologistService.getVolunteersNeedPsychologist().subscribe(response => {
      if (response.data.length) {
        this.allVolunteersNeedPsychologist = response.data;
        
        this.setTableData();
      } else {
        this.isLoadingData = false;
        return;
      }
    });
  }

  helpVolunteer(elm: IViewVolunteerNeedPsychologistTable): void {
    if (elm) {
      this.psychologistService.helpVolunteer(elm.id).subscribe(res => {
        if (res) {
          this.toasterService.open(
            this.toasterOptions.sucessMessage,
            this.toasterOptions.btnOK, 
              {
                duration: this.toasterOptions.timeout,
                panelClass: this.toasterOptions.sucessClass
              }
          );
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

    this.allVolunteersNeedPsychologist.forEach(volunteer => {
      this.data.push({
        id: volunteer.id,
        course: volunteer.course,
        ra: volunteer.ra,
        name: volunteer.user.name,
        phone: volunteer.user.phone,
        email: volunteer.user.email
      });
    });

    this.userData = new MatTableDataSource(this.data);
    this.isLoadingData = false;
  }
}
