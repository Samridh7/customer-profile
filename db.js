const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    database: "customerdb",
    user: "userdeepak",
    password: "samridh"
});

// connection.query(
//     `create table if not exists client(
//         id integer AUTO_INCREMENT primary key,
//         Client_Name VARCHAR(40),
//         Passenger_Name VARCHAR(40) not null,
//         DOB DATE,
//         Mobile_Number integer,
//         Seat VARCHAR(4),
//         Meal VARCHAR(10),
//         Passport_Number VARCHAR(10),
//         Passport_Expiry_Date DATE
//     )`,
//     function(err,results){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Table craeted successfully");
//         }
//     }
// )

function getAllClients(){
    return new Promise(function(resolve,reject){
         connection.query(
             `select * from client`,
             function(err,rows,cols){
                 if(err){
                     reject(err);
                 }
                 else{
                     resolve(rows);
                 }
             }
         )
    })
}

function addNewClients(Client_Name ,Passenger_Name, DOB,Mobile_Number,Seat,Meal,Passport_Number,Passport_Expiry_Date){
    return new Promise(function(resolve,reject){
        connection.query(
            `insert INTO client (Client_Name,Passenger_Name,DOB,Mobile_Number,Seat,Meal,Passport_Number,Passport_Expiry_Date) values (?,?,?,?,?,?,?,?,)`,
            [Client_Name, Passenger_Name, DOB,Mobile_Number,Seat,Meal,Passport_Number,Passport_Expiry_Date],
            function(err,results){
                console.log(err);
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

function searchedClientsData(Client_Name){
    return new Promise(function(resolve,reject){
         connection.query(
             `select * from client where Client_Name = "${Client_Name}"`,
             function(err,rows,cols){
                 if(err){
                     reject(err);
                 }
                 else{
                     resolve(rows);
                 }
             }
         )
    })
}

function updateClientData(id,Client_Name,Passenger_Name,DOB,Mobile_Number,Seat,Meal,Passport_Number,Passport_Expiry_Date){
    return new Promise(function(resolve,reject){
        connection.query(
            `update client set Client_Name = "${Client_Name}",Passenger_Name = "${Passenger_Name}",DOB = "${DOB}",Mobile_Number = ${Mobile_Number},Seat = "${Seat}",Meal = "${Meal}",Passport_Number = "${Passport_Number}",Passport_Expiry_Date = "${Passport_Expiry_Date}"  where id = ${id}`,
            function(err,results){
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
 }

 function deleteClientsData(id){
    return new Promise(function(resolve,reject){
        connection.query(
            `delete from client where id = ${id}`,
            function(err,results){
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

function addnewFFN(Passport_Number,FFN){
    return new Promise(function(resolve,reject){
        connection.query(
            `insert into frequent_flyer_number(Passport_Number,FFN) values (?,?)`,
            [Passport_Number,FFN],
            function(err,results){
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

 function getAllFFN(){
    return new Promise(function(resolve,reject){
         connection.query(
             `select * from client inner join frequent_flyer_number on client.Passport_Number = frequent_flyer_number.Passport_Number`,
             function(err,rows,cols){
                 if(err){
                     reject(err);
                 }
                 else{
                     resolve(rows);
                 }
             }
         )
    })
}

module.exports = {
    getAllClients,
    addNewClients,
    searchedClientsData,
    updateClientData,
    deleteClientsData,
    addnewFFN,
    getAllFFN
}