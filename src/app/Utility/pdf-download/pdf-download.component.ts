import { Component, OnInit, Input } from '@angular/core';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { BsModalRef } from 'ngx-bootstrap';
import { AssetGatePassModel } from 'src/app/sharedservice';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.scss']
})
export class PdfDownloadComponent implements OnInit {  
  
  constructor(public bsModalRef: BsModalRef) { 
  
  }

  ngOnInit() {
    
   this.downloadPdf();
  }

  downloadPdf()
  {
  }
}
