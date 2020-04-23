import { Directive, ElementRef, Input } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[RoleVerification]'
})
export class HideElementsDirective {
  @Input() roles: string[] = [];
  
  constructor(private elm: ElementRef, private loginService: LoginService) {
    if (!this.roles.includes(this.loginService.getUserRole())) {
      this.elm.nativeElement.style.display = 'none';
    }
  }
}
