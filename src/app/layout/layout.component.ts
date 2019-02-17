import { Component, OnInit } from '@angular/core';
import { UserRoleModel,  RoleClient } from '../sharedservice';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private roleClient: RoleClient) { }
  collapsedSideBar: boolean;
  userRoleData: UserRoleModel
  userData: any;
  ngOnInit() {

    if (localStorage.getItem('currentUser')) {
      this.userData = JSON.parse(localStorage.getItem('currentUser'));
      this.roleClient.getUserRoleMenuFunctions(this.userData.roleId)
        .subscribe(data => {
        this.userRoleData = data,
          console.log(this.userRoleData)
        });
    }
  }
  receiveCollapsed($event) {
    this.collapsedSideBar = $event;
  }

}
