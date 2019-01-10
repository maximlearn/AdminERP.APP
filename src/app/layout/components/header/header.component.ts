import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IUserModel, IUserRoleModel } from 'src/app/login/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;

  constructor(public router: Router) { }
  @Input('appUserData') appUserData;
  userData : IUserModel;
  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.userData = this.appUserData;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
}

LogOut()
{
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}
}
