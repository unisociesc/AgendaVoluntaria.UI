import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Turn } from '../models/turn-form-model';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit {
  @Input() radioButton: string;

  turns = [
    '06:00 as 12:00',
    '12:00 as 18:00',
    '18:00 as 24:00',
    '24:00 as 06:00'
  ];

  model = new Turn();
  turnChecked: number;

  constructor() { }

  ngOnInit(): void {
  }


  send() {
    console.log(this.turnChecked)
  }
}
