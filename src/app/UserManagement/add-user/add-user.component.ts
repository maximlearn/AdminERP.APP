import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentModel, RoleModel, UserClient, UserModel, ResponseModel } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  departmentList: DepartmentModel[];
  roleList: RoleModel[];
  user: UserModel = <UserModel>{ id : 0,
    deptId: -101,
    roleId: -101
  };
  responseMessage: ResponseModel;
  @ViewChild('userorm') userForm: NgForm;
  userId: number;
  private gridApi; 
  rowData: any;
  isSaveDisplay : string = "visible";
 
  paginationPageSize : number;
  paginationNumberFormatter : any;
  

  columnDefs = [
    {
      headerName: "Action",
      template:
        "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit'><i data-action-type='edit' class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' data-action-type='delete'><i  data-action-type='delete' class='fa fa-trash-o fa-fw'></i></a>",
      width: 90
    },
    {
      headerName: "Name", cellRenderer: function (params) {
        return (params.data.firstName + ' ' + params.data.lastName);
      }, width: 113
    },
    { headerName: "Emp Id", cellRenderer: function (params) {
      return params.data.empId; }, width: 90 },
    { headerName: "Phone", cellRenderer: function (params) {
      return params.data.phone;}, width: 98 },
    { headerName: "Department", cellRenderer: function (params) {
      return params.data.dept.departmentName;}, width: 120 },
    { headerName: "Role",cellRenderer: function (params) {
      return params.data.role.roleName;}, width: 80 },
    
  ];


  constructor(private userClient: UserClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.userClient.getDepartmentList().subscribe(data => 
      { 
        this.departmentList = data 
      });
    this.userClient.getRoleList().subscribe(data => {
       this.roleList = data 
      });
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.userId = e.data.id;
      this.isSaveDisplay  ="visible";
     

      switch (actionType) {
        case "view":
         return this.ViewUserData(e.data);
        case "edit":
          return this.user = e.data;
        case 'delete':
         return this.deleteUser(this.userId);
      }
    }
  }

  ViewUserData(userData : UserModel)
  {
    this.user = userData;
    this.isSaveDisplay  ="hidden";
   
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.userClient.getAllUser();
  }


  deleteUser(userId: number) {
    this.userClient.deleteUser(userId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.userClient.getAllUser();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }
  // editUser(userId : number)
  // {
  //     this.user = this.rowData

  // }

  SaveUser(user: UserModel) {
    this.userClient.saveUser(user).subscribe(data => {
      this.responseMessage = data;      
      this.rowData = this.userClient.getAllUser();
      this.userForm.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
   // this.userForm.reset();
    this.user = <UserModel>{ id : 0,
      deptId: -101,
      roleId: -101
    };
    this.userForm.controls['employeeId'].markAsUntouched();
    this.responseMessage = null;
    this.isSaveDisplay  ="visible";
  }

}
