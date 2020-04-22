import { Directive, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[RoleVerification]'
})
export class HideElementsDirective {

  constructor(private elm: ElementRef, private loginService: LoginService) {
    if (this.loginService.getUserRole() !== 'psychologist') {
      this.elm.nativeElement.style.display = 'none';
    }
  }
}
