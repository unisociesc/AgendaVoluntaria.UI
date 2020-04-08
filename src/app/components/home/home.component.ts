import { Component } from '@angular/core';
import { CheckinComponent } from '../checkin/checkin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { PsychologistService } from 'src/app/services/psychologist.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends CheckinComponent {

  private toaster = {
    sucessMessage: 'Ajuda solicitada com sucesso',
    btnOK: 'OK',
    timeout: 5000,
    cssClass: ['sucess-toaster']
  };

  constructor(
    private location: GeolocationService,
    private toasterServ: MatSnackBar,
    private pyschService: PsychologistService
  ) {
    super(location, toasterServ);
  }


  callHelp(): void {
    this.pyschService.needHelp().subscribe(res => {
      if (res) {
        this.toasterServ.open(
          this.toaster.sucessMessage,
          this.toaster.btnOK,
          {
            duration: this.toaster.timeout,
            panelClass: this.toaster.cssClass
          }
        );
      }
    },
      (responseError: HttpErrorResponse) => {

      });
  }
}
