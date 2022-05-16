const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    database: "customerdb",
    user: "userdeepak",
    password: "samridh"
});

const process = require("process");

const insert = {
    Client_Name: process.argv[2],
    Passenger_Name: process.argv[3],
    DOB: process.argv[4],
    Mobile_Number: parseInt(process.argv[5]),
    Seat: process.argv[6],
    Meal: process.argv[7],
    Passport_Number: process.argv[8],
    Passport_Expiry_Date: process.argv[9]
}

connection.query(
    `INSERT INTO client (Client_Name,Passenger_Name,DOB,Mobile_Number,Seat,Meal,Passport_Number,Passport_Expiry_Date) VALUES(
        "${insert.Client_Name}",
         "${insert.Passenger_Name}",
        "${insert.DOB}",
        ${insert.Mobile_Number},
        "${insert.Seat}",
        "${insert.Meal}",
        "${insert.Passport_Number}",
        "${insert.Passport_Expiry_Date}"
    )`,
    function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(insert);
            console.log(results);
            console.log(process.argv);
            console.log("data entered successfully");
        }
    }
)