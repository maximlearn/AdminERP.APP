import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { IUserModel, IUserRoleModel } from '../login/models/user.model';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  
  constructor(private layoutService : LayoutService) { }
  collapsedSideBar: boolean;
  userRoleData : IUserRoleModel
  userData : any;
  ngOnInit() {  
   
    if (localStorage.getItem('currentUser'))
    {
       this.userData =  JSON.parse(localStorage.getItem('currentUser'));      
       this.layoutService.GetUserRoleMenuFunction(this.userData.roleId)
                     .subscribe(data => 
                            {     this.userRoleData= data,
                                  console.log(this.userRoleData)
                            });
  }
}
 
  receiveCollapsed($event) {
    this.collapsedSideBar = $event;
  }

}
