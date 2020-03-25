import { Injectable } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GenerateCSVService {

  constructor() { }
  download_CSV(AllData,filename='studentreport'){
    console.log('inside csv service====>',AllData)
    let csvData = this.ConvertToCSV(AllData, ['Student Name', 'Father Name','Mother Name','Date Of Birth','Address','Mobile','Department','Email']);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(AllData, headerList) {
        console.log("Alldata inside covert csv",AllData)
        console.log("Header----->",headerList)
         let array = typeof AllData != 'object' ? JSON.parse(AllData) : AllData;
        // let array = AllData.index;
        console.log("array====>",array)
         let str = '';
         let row = 'Student Id,';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array[0].length; i++) {
             let line = (i+1)+'';
             for (let index in headerList) {
                let head = headerList[index];
                 line += ',' + array[0][i][head];
                 console.log("Line",line, array[index]);
             }
             str += line + '\r\n';
         }
         return str;
     }

}
