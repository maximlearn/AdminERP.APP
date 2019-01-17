import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserModel } from 'src/app/sharedservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;

  constructor(public router: Router) { }
  @Input('appUserData') appUserData;
  userData : UserModel;
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
