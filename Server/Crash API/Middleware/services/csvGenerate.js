// const db = require('../DataBase/dbConnection')

// const createCSV_file=(req,res)=> {
//   console.log("create csv Called in function");
//   return new Promise((resolve, reject) => {
//     sqlQry = "select * FROM student";
//     db.query(sqlQry, (err, rows) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('data' + JSON.stringify(rows));
//         //creating csv file=============================>
//         var file_path = "newData.csv"
//         console.log(__dirname)
//         jsonexport(rows, function (err, csv) {
//           if (err) {
//             console.log(err);
//           }
//           else {
//             console.log("==>",csv);
//             fs.writeFile(file_path, csv, (err) => {
//               if (err) {
//                 console.log(err);
//                 reject(err)

//               } else {
//                 console.log("Successfully Written to File.");
//                 resolve({ "filepath": file_path, "csv": csv })

//               }


//             });
//           }

//         });
//         console.log("________________________");


//       }

//     })

//   })
// }
const fs = require('fs');

module.exports.csvGenrater = (rows, err) => {

    console.log("csv genrator called in service--->", rows);
    var rowHeading = ['std ID', 'Std Name', 'std Adresss', 'std Mobile \n'];

    console.log("inside function-------------->");
    // create and write header to the csv file
    fs.writeFile('std_report.csv', rowHeading, (err) => {
        if (err) throw err;
        console.log('Heading Data Saved!');
    });
    // create and write header to the csv file
    var rowData = [];
    for (let item of rows) {
        Data = [item.std_id,
        item.std_name,
        item.std_address,
        item.std_mobile+'\n-1'
       ]
        rowData.push(Data);    
    }
    console.log('rowdsata--->',rowData)
    fs.appendFile('std_report.csv', rowData,(err) => {
        if (err) throw err;
        console.log('Data Saved!');

    });

}

