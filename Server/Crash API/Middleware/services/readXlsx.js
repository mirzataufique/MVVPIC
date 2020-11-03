const xlsx = require('xlsx');
const db = require('../../Config/dbConnection');
module.exports.readXlsx = (req, res,err) => {
    console.log('inside service---->');
   
    let workBook = xlsx.readFile("/home/taufique/Downloads/Savings Summary_With Customer ID.xlsx");

    let monthlySheet = workBook['Sheets']['Monthly'];
    let pivotMemberSheet = workBook['Sheets']['Pivot by member'];
    
    let monthlyData=[];
    monthlyData = xlsx.utils.sheet_to_json(monthlySheet, { raw: true });
    let pivotMemberData = xlsx.utils.sheet_to_json(pivotMemberSheet, { raw: true });
    console.log("----->")

    monthlyData.forEach((element) => {
       var  yr=element['Years3'];
       var  year= yr.substring(2,4);
       console.log("length",);
        console.log("sub string year---->",year);
        rs_tran_date = "01-" + element['Month'] + "-" + year
        // console.log("----->", rs_tran_date)
        console.log("sum of redump",element['Sum of Redemptions  '])
        data = {
            "rs_tran_cust_id": element['Customer ID'],
            "rs_tran_date": rs_tran_date,
            "sum_of _redemptions": element['Sum of Redemptions  '],
            "sum_of_savings_estimate": element['Sum of savings_estimate']
        }
        
        console.log("object data--->",data)
        db.query('INSERT INTO mst_rewards_saving SET ?', data, (err) => {
            if (err) {
                console.log("failed", err);
            }        
        })
       
        // console.log(count,"Data sucessfully inserted");
        console.log("end--------------->")
    })
    
}

