import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AssetGatePassModel, DocumentModel } from 'src/app/sharedservice';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-view-asset-gate-pass',
  templateUrl: './view-asset-gate-pass.component.html',
  styleUrls: ['./view-asset-gate-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAssetGatePassComponent implements OnInit {
  title: string;
  closeBtnName: string;
  gatePassData: AssetGatePassModel;
  assetImage: DocumentModel; 
  isPDFDownload: boolean = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.assetImage = this.gatePassData.company
  }

 
  pdfDownload() {
    this.isPDFDownload=true;
    setTimeout( () => { 
    
      var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options 
      var imgWidth = 208;
      var pageHeight = 135;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
 
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
      var position = 25;
     // pdf.setFontSize(22);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); 
      this.isPDFDownload=false;
    //  this.isPDFDownload=false;
      // Generated PDF  
    }); }, 0 );
   
   
   }
 
 
  

}

