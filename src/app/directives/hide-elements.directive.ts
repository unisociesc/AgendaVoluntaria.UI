import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[RoleVerification]'
})
export class HideElementsDirective implements OnChanges {
  @Input('RoleVerification') roles: string;

  private userRole: string;
  private adminRole = 'admin';

  constructor(private elm: ElementRef, private loginService: LoginService) {
    this.userRole = this.loginService.getUserRole();
  }

  ngOnChanges(): void {
    if (this.roles !== this.userRole && this.userRole !== this.adminRole) {
      this.elm.nativeElement.style.display = 'none';
    }
  }
}
