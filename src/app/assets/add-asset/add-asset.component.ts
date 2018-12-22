import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor() {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
});
   }

  ngOnInit() {
  }

}
