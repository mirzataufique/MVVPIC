import { Component, OnInit } from '@angular/core';
import { GenerateCSVService } from 'src/app/Services/generate-csv.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MainControllerService } from '../../Services/mainController.service'
import { concatAll } from 'rxjs/operators';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-stdreport',
  templateUrl: './stdreport.component.html',
  styleUrls: ['./stdreport.component.css']
})
export class StdreportComponent implements OnInit {
  // public AllData = [];
  config: any;
  collection = { count: 10, data: [] };
  p: Number = 1;
  count: Number = 5;

  source: LocalDataSource;

  constructor(private _mainService: MainControllerService,
    private _csvService: GenerateCSVService,
    private http: HttpClient) {this.source = new LocalDataSource(this.Data)}
  pageChanged(event) {
    this.config.currentPage = event;
  }

  Data: any = [];
  ngOnInit() {
    console.log("student component called")
    this.tData = true;
    this._mainService.getStudents().subscribe((result) => {
      this.Data = result;
      console.log("alldata------------>", this.Data)
    })
  }
  std_id;
  
  filter() {
    console.log("------=", this.std_id);
    this._mainService.getStudentsByid(this.std_id).subscribe((result) => {
        console.log(result)
        this.Data.push(result);
    });
  };
  filterData:any []
  search(term: string) {
    console.log("search=====>");
    
    if(!term) {
      this.filterData = this.Data;
    } else {
      this.filterData = this.Data.filter(x => 
         x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  };

  tData: boolean = false;
  delete(_id){
    console.log("inside Delete-->",_id);
    this.tData = true;
    this._mainService.deteleById(_id).subscribe((result)=>{
      console.log(result);
      this.Data.push(result);
    })
  }
  exportClick(AllData: any) {
    console.log("export click called", this.Data);
    this._csvService.download_CSV(this.Data, 'studentreport');

  }
  

}
