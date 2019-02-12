import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentModel, ResponseModel, DepartmentClient } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
 // departmentList : DepartmentModel[];
  department: DepartmentModel = <DepartmentModel>{ id : 0 };
  responseMessage: ResponseModel;
  @ViewChild('deptform') deptform: NgForm;
  departmentId: number;
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
      width: 120
    },
    {
      headerName: "Department Name", cellRenderer: function (params) {
        return params.data.departmentName ;
      },width : 400
    }
  ];


  constructor(private departmentClient: DepartmentClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.departmentId = e.data.id;
      this.isSaveDisplay  ="visible";
      this.responseMessage= null;

      switch (actionType) {
        case "view":
         return this.ViewDepartment(e.data);
        case "edit":
          return this.department = e.data;
        case 'delete':
         return this.deleteDepartment(this.departmentId);
      }
    }
  }

  ViewDepartment(department : DepartmentModel)
  {
    this.responseMessage =null;
    this.department = department;
    this.isSaveDisplay  ="hidden";
   
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.departmentClient.getAllDepartments();
  }


  deleteDepartment(departmentId: number) {
    this.departmentClient.deleteDepartment(departmentId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.departmentClient.getAllDepartments();
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

  SaveDepartmant(department: DepartmentModel) {
    this.departmentClient.saveDepartment(department).subscribe(data => {
      this.responseMessage = data;      
      this.rowData = this.departmentClient.getAllDepartments();
      this.department = <DepartmentModel>{ id : 0 };
      this.deptform.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
   // this.userForm.reset();
    this.department = <DepartmentModel>{ id : 0 };
    this.deptform.controls['departmentName'].markAsUntouched();
    this.responseMessage = null;
    this.isSaveDisplay  ="visible";
  }
}
