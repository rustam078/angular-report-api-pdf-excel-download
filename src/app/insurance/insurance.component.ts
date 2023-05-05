import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { Searchrequest } from '../searchrequest';
import { Searchresponse } from '../searchresponse';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
  constructor(private insuranceService : InsuranceService) { }

  public planNames: string[] | undefined ;
  public planStatuses : any;

  public selectedPlan = "select";
  public selectedStatus = "select";

  searchRequest : Searchrequest = new Searchrequest();
  searchResponse : Searchresponse[] = [];

  ngOnInit(): void {
    this.getPlanNames();
    this.getPlanStatus();
  }

  getPlanNames(){
    this.insuranceService.getPlanNames().subscribe(data => {
      this.planNames = data;
    });
  }

  getPlanStatus(){
    this.insuranceService.getPlanStatus().subscribe(data => {
      this.planStatuses = data;
    });
  }

  search(){
    this.searchRequest.planname = this.selectedPlan;
    this.searchRequest.planstatus = this.selectedStatus;
    this.insuranceService.search(this.searchRequest).subscribe(data => {
          this.searchResponse = data;
        
    });
  }

  onSubmit() {
    this.search();
  }
  exportToExcel() {
    this.insuranceService.getExcel().subscribe(data => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportToPdf() {
    this.insuranceService.getPdf().subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

}
}
