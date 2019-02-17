import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleModel, ResponseModel, RoleClient, RoleMenuModel, MenuModel } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  role: RoleModel = <RoleModel>{ id: 0, roleMenu: [] }; 
  menuList : MenuModel[];
  responseMessage: ResponseModel;
  @ViewChild('roleform') roleform: NgForm;
  departmentId: number;
  private gridApi;
  rowData: any;
  isSaveDisplay: string = "visible";
  paginationPageSize: number;
  paginationNumberFormatter: any;

  columnDefs = [
    {
      headerName: "Action",
      template:
        "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit'><i data-action-type='edit' class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' data-action-type='delete'><i  data-action-type='delete' class='fa fa-trash-o fa-fw'></i></a>",
      width: 120
    },
    {
      headerName: "Role Name", cellRenderer: function (params) {
        return params.data.roleName;
      }, width: 400
    }
  ];

  constructor(private roleClient: RoleClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.roleClient.getRoleMenuList(this.role.id).subscribe(data => {
      this.role.menuList = data;this.menuList=data;
    })
   // this.roleClient.getBlankRoleMenu().subscribe(data => {this.roleMenu = data;})
   
  }
  getChecked(menuId : number, parentMenuId : number) {  
      if (this.role.roleMenu.some(x=>x.menuId == menuId))
      {
        this.role.roleMenu.filter(x=>x.menuId==menuId)[0].parentMenuId = parentMenuId
      }
    return this.role.roleMenu.some(x=>x.menuId == menuId);
  }
 
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.departmentId = e.data.id;
      this.isSaveDisplay = "visible";
      this.responseMessage = null;

      switch (actionType) {
        case "view":
          return this.ViewRole(e.data);
        case "edit":
          return this.EditRole(e.data);
        case 'delete':
          return this.deleteRole(this.departmentId);
      }
    }
  }

  ViewRole(role: RoleModel) { 
    this.role = role;
    this.role.menuList = this.menuList;  
    this.isSaveDisplay = "hidden";
  }

  EditRole(role: RoleModel)
  {
    this.responseMessage = null;
    this.role = role;
    console.log(role);
    this.role.menuList = this.menuList;   
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.roleClient.getAllRole();
  }

  deleteRole(roleId: number) {
    this.roleClient.deleteRole(roleId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.roleClient.getAllRole();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }
  
  onStatusChange(roleId: number,parentMenuId: number, childPrentMenuId: number, menuId: number, isChecked: boolean) {
    if (isChecked) {     
      if (!(this.role.roleMenu.some(x => x.menuId == childPrentMenuId))) {  
        let role_Menu = new RoleMenuModel();
        role_Menu.roleId = roleId;  
        role_Menu.parentMenuId = parentMenuId;
        role_Menu.menuId = childPrentMenuId;
        this.role.roleMenu.push(role_Menu)
      }
      let roleMenu = new RoleMenuModel();
      roleMenu.roleId = roleId;   
      roleMenu.parentMenuId = childPrentMenuId;   
      roleMenu.menuId = menuId;
      this.role.roleMenu.push(roleMenu);     
    } else {
      this.role.roleMenu = this.role.roleMenu.filter(x => x.menuId != menuId);
      if (!(this.role.roleMenu.some(x =>x.parentMenuId == childPrentMenuId)))
         this.role.roleMenu = this.role.roleMenu.filter(x => x.menuId != childPrentMenuId);
    }
    console.log(this.role.roleMenu);
  }

  SaveRole(role: RoleModel) {
    this.roleClient.saveRole(role).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.roleClient.getAllRole();
      this.role = <RoleModel>{ id: 0, roleMenu: [],menuList:[] }; 
      this.role.menuList = this.menuList;
      this.roleform.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
    // this.userForm.reset();
    this.role = <RoleModel>{ id: 0, roleMenu: [],menuList:[] }; 
    this.role.menuList = this.menuList;
    this.roleform.controls['roleName'].markAsUntouched();
    this.responseMessage = null;
    this.isSaveDisplay = "visible";
  }


}
