import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService, LoaderState } from 'src/app/shared/common-service.service';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit,OnDestroy {
  loading : boolean = true;
  public loadingTemplate: TemplateRef<any>;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  private subscription: Subscription;
  constructor(private loaderService: CommonService) { }

  ngOnInit() {
    this.loading = false;
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.loading = state.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
