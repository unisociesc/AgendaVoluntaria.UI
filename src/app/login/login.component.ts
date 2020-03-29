import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../models/login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model = new Login();

  selected: string;
  roles = [
    'Voluntário',
    'Psicologo'
  ];

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(
        this.model.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(
        this.model.password, [
        Validators.required
      ]),
      role: new FormControl(
        this.model.role, [
          Validators.required
        ])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get role() {
    return this.loginForm.get('role');
  }

  onSubmit(form) {
    console.log(form)
    console.log(this.loginForm)
      this.route.navigate(['volunteer']);
  }
}
