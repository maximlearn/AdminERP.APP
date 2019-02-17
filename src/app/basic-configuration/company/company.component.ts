import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyModel, ResponseModel, CompanyClient, DocumentModel } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';
import { IFile } from 'src/app/assets/models/asset.model';
import { CommonService } from 'src/app/shared/common-service.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: CompanyModel = <CompanyModel>{ id: 0, country: "-101" };
  responseMessage: ResponseModel;
  @ViewChild('companyform') companyform: NgForm;
  companyId: number;
  private gridApi;
  rowData: any;
  isSaveDisplay: string = "visible";
  paginationPageSize: number;
  paginationNumberFormatter: any;
  validImage: boolean = true;
  filesToUpload: Array<IFile>;
  selectedFileNames: Array<IFile> = [];

  columnDefs = [
    {
      headerName: "Action",
      template:
        "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit'><i data-action-type='edit' class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' data-action-type='delete'><i  data-action-type='delete' class='fa fa-trash-o fa-fw'></i></a>",
      width: 100
    },
    {
      headerName: "Name", cellRenderer: function (params) {
        return params.data.companyName;
      }, width: 100
    },
    {
      headerName: "Address", cellRenderer: function (params) {
        return params.data.address1;
      }, width: 100
    },
    {
      headerName: "Phone", cellRenderer: function (params) {
        return params.data.phone;
      }, width: 100
    },
    {
      headerName: "Email", cellRenderer: function (params) {
        return params.data.email;
      }, width: 100
    },
    {
      headerName: "Country", cellRenderer: function (params) {
        return params.data.country;
      }, width: 100
    },
    {
      headerName: "URL", cellRenderer: function (params) {
        return params.data.webSiteUrl;
      }, width: 100
    }
  ];


  constructor(private companyClient: CompanyClient, private companyService: CommonService) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.companyId = e.data.id;
      this.isSaveDisplay = "visible";
      this.responseMessage = null;

      switch (actionType) {
        case "view":
          return this.viewCompany(e.data);
        case "edit":
          return  this.editCompany(this.companyId); //this.company = e.data;
        case 'delete':
          return this.deleteCompany(this.companyId);
      }
    }
  }

  viewCompany(company: CompanyModel) {
    this.responseMessage = null;
    this.company = company;
    this.isSaveDisplay = "hidden";
  }

   
  editCompany(companyId: number){
      this.companyClient.getCompanyById(companyId).subscribe(data => {
          this.company = data;
          console.log(this.company.companyLogo.fileImage);
        
        },
        error => {
          this.responseMessage = error;
        }
        );
  }

  deleteCompany(companyId: number) {
    this.companyClient.deleteCompany(companyId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.companyClient.getAllCompany();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.companyClient.getAllCompany();
  }

  uploadFiles(): FormData {

    if (this.selectedFileNames.length > 0) {
      const formData = new FormData();
      for (let file of this.selectedFileNames)
        formData.append(file.filelabel, file);
      return formData;
    }
  }

  SaveCompanyData(company: CompanyModel) {
    let formData = this.uploadFiles();
    if (company.id == 0) { this.SaveCompany(company, formData); }
    else { this.UpdateCompany(company, formData); }

  }

  SaveCompany(company: CompanyModel, formData: FormData) {
    this.companyService.SaveCompany(company, formData).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.companyClient.getAllCompany();
      this.company = <CompanyModel>{ id: 0, country: "-101" };
      this.companyform.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  UpdateCompany(company: CompanyModel, formData: FormData) {
    company.companyLogo=null;
    this.companyService.UpdateCompany(company, formData).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.companyClient.getAllCompany();
      this.company = <CompanyModel>{ id: 0, country: "-101" };
      this.companyform.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
    // this.userForm.reset();
    // this.companyform.reset();
    this.company = <CompanyModel>{ id: 0, country: "-101" };
    this.companyform.controls['companyName'].markAsUntouched();
    this.companyform.controls['address'].markAsUntouched()
    this.companyform.controls['phoneno'].markAsUntouched()
    this.companyform.controls['companyName'].markAsUntouched()

    this.responseMessage = null;
    this.isSaveDisplay = "visible";
  }

  fileChangeEvent(fileInput: any, fileInputLabel: string) {

    this.filesToUpload = <Array<IFile>>fileInput.target.files;

    var fileType = this.filesToUpload[0].type;
    var allowed;
    var found = false;
    if (fileInputLabel.indexOf("Image") > 0) {
      allowed = ["jpeg", "png", "gif", "jpg"];
      this.validImage = true
      allowed.forEach(function (item, index) {
        if (fileType.match('image/' + item)) { found = true; }
      })
      if (!found) {
        this.validImage = false;
        return;
      }
    }

    fileInput.target.nextSibling.innerHTML = this.filesToUpload[0].name;
    if (this.selectedFileNames.some(x => x.filelabel === fileInputLabel)) {
      this.selectedFileNames = this.selectedFileNames.filter(x => x.filelabel !== fileInputLabel);
    }
    for (let file of this.filesToUpload) {
      file.filelabel = fileInputLabel;
      this.selectedFileNames.push(file);
    }
  }

}
