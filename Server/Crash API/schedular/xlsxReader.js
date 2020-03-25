const csv = require('csv-parser');
const fs = require('fs');
let xlsx = require('xlsx');
let moment = require('moment');
const config = require('../config');
var path = require('path');
const dbconnection = require('../DataBase/dbConnection');
// const sourcedata = require('../app-services/gems_services/gems_services');
let Validator = require('validatorjs');
let Client = require('ssh2-sftp-client');
let sftp = new Client();
var mv = require('mv');
var filedata = [];
var insertRewardSavings = [], savingfiles = [], mvfilearray = [];
let monthlyData = [], dailyarr = [], monthlyarr;
var sourcedesc;
var sourcetype;
let sourceObj = {}, transIdArray = [], handBackArray = [], custArray = [];
var dest, src, savingfile, fileExtension;
var filesdata = {};
//console.log("connection---->",dbconnection())

//console.log("========>conn",conn);
// ========== exicute 
async function executeQuery(query, connection, record) {
  return new Promise((resolve, reject) => {
      connection.query(query, record, (err, result) => {
          if (err) {
              reject(err);
              //console.log(err);
          } else {
              //console.log("ressss",result);
              resolve(result);
          }
      });
  })
}

//Getting data from server=================>
function pendingFiles() {
  console.log("list of pending files to be process---");
  return new Promise((resolve, reject) => {
    sftp.connect(config.sftp_connection).then(() => {

      return sftp.list(config.pending_flat_file_path);//read file path from UAT server and retun the list

    }).then(filelist => {
      console.log("filelist------>", filelist);
      for (let files of filelist) {  // reading file from file list 
        fileExtension = path.extname(files.name);// File extention
        data = { "name": files.name, "fileextension": fileExtension };// getting file data
        // if (fileExtension == '.csv' && files.name.match('GEMS_Rewards_Savings')) {
        //   savingfiles.push(data);
        // }
        if (fileExtension == '.xlsx' && files.name.match('SavingsSummary_WithCustomerID')) {
          savingfiles.push(data);
        }
      }
      return savingfiles;
    }).then((savingfiles) => {
      console.log("saving files-----", savingfiles);
      movefiles(savingfiles);
    }).then(() => {
      console.log("resovle savingfile called--------->")
      resolve(savingfiles);
      // sftp.end();
    })
  }).catch((err) => {
    console.log("error in promise-- ", err)
    reject(err)
  })
}
// ========----------------------------->    moving data to the csv and xlsx file
async function movefiles(savingfiles) {
  console.log("move function called");
  if (savingfiles) {
    for (let mvfile of savingfiles) {
      console.log("mvfiles called------->", mvfile);
      src = config.pending_flat_file_path + mvfile.name;
      // if (mvfile.fileextension == '.csv' && mvfile.name.match('GEMS_Rewards_Savings')) {
      //   dest = config.dailyFile_path + mvfile.name;
      //   console.log("----dest of csv",dest)
      //   await sftp.get(src, dest);
      // }
      if (mvfile.fileextension == '.xlsx' && mvfile.name.match('SavingsSummary_WithCustomerID')) {
        dest = config.monthlyFile_path + mvfile.name;

        await sftp.get(src, dest);
        console.log("----dest of xls",dest)
      }

    }
    return savingfiles;
  } else {
    console.log("NO Need to download file");
    return;
  }
}
// =============================================>
// function yearFormate(year){

// }
pendingFiles().then(async (res) => {
  
   console.log("resdata===>", res);
  
    console.log('file path--->',config.monthlyFile_path);
    console.log('pending file name----',res[0].name);
    // let workBook = xlsx.readFile("/home/taufique/Desktop/NodeJs/Crash API/schedular/flatfiles/monthlyfiles/SavingsSummary_WithCustomerID.xlsx");
    let workBook =  xlsx.readFile(config.monthlyFile_path + res[0].name);
    let monthlySheet = workBook['Sheets']['Monthly'];
   
    
     monthlyData = xlsx.utils.sheet_to_json(monthlySheet, { raw: true });

    console.log(" monthly data ----->",monthlyData[0]);;
    

    for(let i = 0; i < monthlyData.length-1 ; i++){
      var yr=monthlyData[i]['Years3'];
      var  year= yr.toString().substring(2,4);
      var rs_tran_date = "01-"+monthlyData[i]['Month']+"-"+year;
      // console.log("rs_tran_date------>",rs_tran_date)
      // console.log('elements--->',monthlyData[i]['Customer ID'], monthlyData[i]['Years3'],monthlyData[i]['Sum of Redemptions  '],monthlyData[i]['Sum of savings_estimate'])
      data = {
        "rs_tran_cust_id": monthlyData[i]['Customer ID'],
        "rs_tran_date": rs_tran_date,
        "sum_of _redemptions": monthlyData[i]['Sum of Redemptions  '],
        "sum_of_savings_estimate": monthlyData[i]['Sum of savings_estimate']
    }

    console.log("object data--->",data)
    var query='INSERT INTO mst_rewards_saving SET ?';
    var conn = await dbconnection;
    console.log("conn======>",conn);
    var result  = await executeQuery(query,conn,data)
    console.log(result);
      console.log("inside looop--------->")

    }
    //   var  yr= monthlyData[element]['Years3'];
    //   var  year= yr.toString().substring(2,4);s
    //   console.log("---------------",year);
    //   rs_tran_date = "01-" + element['Month'] + "-" + year;
    //   console.log('data========',rs_tran_date)
    //   console.log('data========',element['Sum of Redemptions  '])

     
    //   data = {
    //     "rs_tran_cust_id": element['Customer ID'],
    //     "rs_tran_date": rs_tran_date,
    //     "sum_of _redemptions": element['Sum of Redemptions  '],
    //     "sum_of_savings_estimate": element['Sum of savings_estimate']
    // }
    // //  console.log("object data--->",data)
    //     dbconnection.query('INSERT INTO mst_rewards_saving SET ?', data, (err) => {
    //         if (err) {
    //             console.log("failed", err);
    //         }        
    //     })
    // }
    // monthlyData.forEach((element) => {
    //    var  yr=element['Years3'];
    //    var  year= yr.toString().substring(-2);
    //   //  console.log("length",);
    //     // console.log("sub string year---->",year);
    //     rs_tran_date = "01-" + element['Month'] + "-" + year;
    //     // console.log("----->", rs_tran_date)
    //     // console.log("sum of redump",element['Sum of Redemptions  '])
        // data = {
        //     "rs_tran_cust_id": element['Customer ID'],
        //     "rs_tran_date": rs_tran_date,
        //     "sum_of _redemptions": element['Sum of Redemptions  '],
        //     "sum_of_savings_estimate": element['Sum of savings_estimate']
        // }
        
        // // console.log("object data--->",data)
        // dbconnection.query('INSERT INTO mst_rewards_saving SET ?', data, (err) => {
        //     if (err) {
        //         console.log("failed", err);
        //     }        
        // })
       
    //     // console.log(count,"Data sucessfully inserted");
        
    // })
    console.log("Data Successfully Inserted--------------->")







})





// ===============================================>
function readFlatFile(readpendingfile) {
  console.log('re------------->',readpendingfile)
  return new Promise((resolve, reject) => {

    // if (readpendingfile.fileextension == '.csv') {
    //   fs.createReadStream(config.dailyFile_path + readpendingfile.name).pipe(csv())
    //     .on('data', (row) => {
    //       filedata.push(row);
    //       // dailyarr = resolve(filedata);
    //       //   dailyarr.push(filedata);
    //       // dailyarr = filedata;
    //     })
    //     .on('end', (data) => {
    //       // console.log("readfile data---", data);
    //     });
    // }
    if (readpendingfile.fileextension == '.xlsx') {

      console.log("xlsx file reading----", config.monthlyFile_path + readpendingfile.name);
      let workBook = xlsx.readFile(config.monthlyFile_path + readpendingfile.name);
      let monthlySheet = workBook['Sheets']['Monthly'];
      // let pivotcustSheet = workBook['Sheets']['Pivot by member'];
      console.log("montly sheets-", monthlySheet);
      monthlyData = xlsx.utils.sheet_to_json(monthlySheet, { raw: true });
      // let pivotcustData = xlsx.utils.sheet_to_json(pivotcustSheet, { raw: true });
      //   monthlyarr = resolve(monthlyData);
      // monthlyarr = monthlyData;
      //   monthlyarr.push(monthlyData);

    }
    // filesdata = {
    //   "monthlydata": monthlyarr,
    //   "dailydata": dailyarr
    // };

    // console.log("filedata---", filesdata)
    // resolve({
    //   status:true,
    //   filedata:filesdata
    // });
    // Promise.all(monthlyarr, dailyarr).then((res) => {
    //   console.log("arr data---- ", res);
    //   resolve({
    //     status: true,
    //     filedata: res
    //   });
    // });

  }).catch((err) => {
    console.log("error in promise-- ", err)
    // reject(err)
  })
}



// pendingFiles1().then((pendingfileres) => {
//   // console.log("pendingfileres---", pendingfileres);
//   return new Promise((resolve, reject) => {
//     for (let readfile of pendingfileres) {

//       readFlatFile(readfile).then(async (result) => {
//         console.log("result from readflatfile----", result['filedata'].dailydata);
//         if (result.length > 0) {

//           let transArray = await getAllTransactions();
//           for (let transVal of transArray) {
//             transIdArray.push(transVal.trans_id);
//           }
//           sourcedata.getSourceData().then((sourceresult) => {
//             // console.log("get source result----", sourceresult['values']);
//             for (let sourceVal of sourceresult.values) {
//               if (sourceVal.activity_type == 'accrual')
//                 sourceObj[sourceVal.code] = sourceVal;
//             };

//             let rules = {
//               TRAN_ID: 'required',
//               TRAN_CUSTOMER_ID: 'required',
//               TRAN_POINTS_SOURCE_ID: 'required',
//               TRAN_DATE: 'required',
//               TRAN_SAVINGS: 'required|numeric'
//             };

//             // for (let element of monthlyData) {
//             //   var yr = element['Years3'];
//             //   var year = yr.substring(2, 4);
//             //   rs_tran_date = "01-" + element['Month'] + "-" + year;
//             //   data = {
//             //     "rs_tran_cust_id": element['Customer ID'],
//             //     "rs_tran_date": rs_tran_date,
//             //     "sum_of _redemptions": element['Sum of Redemptions  '],
//             //     "sum_of_savings_estimate": element['Sum of savings_estimate']
//             //   }
//             //   db.query('INSERT INTO mst_rewards_saving SET ?', data, (err) => {
//             //     if (err) {
//             //       console.log("failed", err);
//             //     }
//             //   })
//             // }

//             for (let record of result) {

//               let validation = new Validator(record, rules);
//               if (validation.passes() && !validation.fails()) {

//                 if (!sourceObj.hasOwnProperty(record.TRAN_POINTS_SOURCE_ID)) {
//                   generateHandbackArray(false, record, 'Source code not found');
//                   continue;
//                 };

//                 if (transIdArray.indexOf(record.TRAN_ID) > -1) {
//                   generateHandbackArray(false, record, 'Dublicate transaction ID');
//                   continue;
//                 };

//                 sourcedesc = sourceObj[record.TRAN_POINTS_SOURCE_ID].name;
//                 sourcetype = sourceObj[record.TRAN_POINTS_SOURCE_ID].activity_type;

//                 insertRewardSavings.push(insertData(trimObj(record), sourcedesc, sourcetype));
//                 generateHandbackArray(true, record, null);
//                 transIdArray.push(record.TRAN_ID);
//                 // custArray.push(record.TRAN_CUSTOMER_ID);

//               } else {
//                 generateHandbackArray(false, record, validation.errors.errors);
//               }
//             }

//             Promise.all(insertRewardSavings).then((res) => {
//               console.log("inserted data--- ", res);
//               generateHandbackFile();
//             });
//           })
//         } else {
//           console.log("in else part---");
//         }
//       })
//     }
//   })
// })


function generateHandbackArray(status, record, error, responseCode) {
  if (typeof error == 'object')
    error = JSON.stringify(error);
  record['process_date'] = new Date();
  record['process_status'] = status == true ? 'Success' : 'Failed';
  record['process_responseCode'] = responseCode == true ? 200 : 404;
  record['process_error'] = error;
  handBackArray.push(record);
}

function getAllTransactions() {
  return new Promise(resolve => {
    let query = "SELECT DISTINCT rs_tran_id AS trans_id FROM mst_rewards_savings";
    dbconnection.executequery(query).then((result) => {
      // console.log("in getalltransaction----", result);
      resolve(result)
    })
  })
}

function generateHandbackFile() {
  try {
    return new Promise((resolve, reject) => {

      let ws = xlsx.utils.json_to_sheet(handBackArray);
      let wb = xlsx.utils.book_new();
      let path = config.handback_path;
      console.log("path is---", path);
      xlsx.utils.book_append_sheet(wb, ws, savingfile);
      xlsx.writeFile(wb, path + savingfile);

      mv(dest, config.archive_file_path + savingfile, function (err) {
        console.log("file moved....")
      });
    }).catch((err) => {
      console.log("errrrrrrrrr", err);
    })
  } catch (err) {
    console.log("in catch----", err);
  }
}


//function to insert data into db
function insertData(data, sourcedesc, sourcetype) {
  // console.log("function insertData---",data);
  return new Promise((resolve, reject) => {
    var insert_reward_savings = "INSERT INTO `mst_rewards_savings` (`rs_tran_id`,`rs_tran_cust_id`,`rs_tran_point_src_id`,`rs_tran_promo_code`,`rs_tran_date`,`rs_savings`,`rs_tran_sourcename`,`rs_tran_sourcetype`,`rs_is_inserted`,`rs_inserted_on`) values (?,?,?,?,?,?,?,?,?,?)";
    var values = [];
    values.push(
      data.TRAN_ID,
      data.TRAN_CUSTOMER_ID,
      data.TRAN_POINTS_SOURCE_ID,
      data.TRAN_PROMO_CODE,
      data.TRAN_DATE,
      data.TRAN_SAVINGS,
      sourcedesc,
      sourcetype,
      1,
      new Date()
    );
    dbconnection.executevaluesquery(insert_reward_savings, values).then((result) => {
      resolve({
        status: true,
        message: "Data inserted"
      })
    }).catch((err) => {
      console.log("in catch errrrrr", err);
    })
  }).catch((err) => {

  })
}
