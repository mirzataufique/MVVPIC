import { Component, OnInit } from '@angular/core';
import { StudentListService } from 'src/app/Services/student-list.service';
import { GenerateCSVService } from 'src/app/Services/generate-csv.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MainControllerService} from '../../Services/mainController.service'


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



  constructor(private _mainService: MainControllerService,
    private _csvService: GenerateCSVService,
    private http: HttpClient) { }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  AllData: any = [];
  quizData:any=[];
  ngOnInit() {
    console.log("student component called")

    this._mainService.getStudents().subscribe((result) => {
      // console.log("my result-- ", result["data"])
      this.AllData.push(result['data']);
      console.log("alldata------------>",this.AllData)
      // })
      // console.log("my data-- ",alldata);
    })
    // let AllData = this._studentService.getStudents()
    // obs.subscribe((data) => {

    //   this.AllData = data;
    // })

    // console.log("====>", this.AllData);
    this._mainService.getQuizData().subscribe((result)=>{
      // console.log("quiz data=====>",result['data'])
      this.quizData.push(result['data'])
      console.log("result",this.quizData)
    })


  }
  std_id;
  std_name
  filterClick() {
    console.log("------=",this.std_id);
    console.log("Filter click called",event);
    // this._csvService.getById(id: any;);
    this._mainService.getStudentsByid(this.std_id).subscribe((result) => {
   
     
    });
  }
  exportClick(AllData:any) {
    console.log("export click called",this.AllData);
  
    this._csvService.download_CSV(this.AllData, 'studentreport');

  }

}
