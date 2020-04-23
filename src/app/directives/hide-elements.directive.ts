import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[RoleVerification]'
})
export class HideElementsDirective implements OnInit {
  @Input("RoleVerification") roles: string[] = [];
  
  constructor(private elm: ElementRef, private loginService: LoginService) {
  }

  ngOnInit() {
    if (!this.roles.includes(this.loginService.getUserRole())) {
      this.elm.nativeElement.style.display = 'none';
    }
  }
}
