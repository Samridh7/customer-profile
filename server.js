const express = require("express");
const path = require("path");
const hbs = require("hbs");
const db = require("./db");
const { truncateSync } = require("fs");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.set("view engine","hbs");
hbs.registerHelper("dateFormat", require("handlebars-dateformat"));

app.get("/", (req,res) => {
     db.getAllClients().then((client) => {
        //  console.log(client.DOB);
             res.render("client", {
                 clients: client
             })
     })
})

app.get("/add", (req,res) => {
    res.render("add_client");
})

app.post("/add", (req,res) => {
    // data.push([req.body.FFN]);
    db.addNewClients(req.body.Client_Name,req.body.Passenger_Name,req.body.DOB,req.body.Mobile_Number,req.body.Seat,req.body.Meal,req.body.Passport_Number,req.body.Passport_Expiry_Date).then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err.sqlMessage);
        res.send(err.sqlMessage);
    })
})

app.get("/search", (req,res) => {
    // console.log(req.query.search);
    db.searchedClientsData(req.query.search).then((client) => {
          res.render("search_client", {
              clients: client
          })
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post("/update", (req,res) => {
    // console.log(req.body.id);
     db.updateClientData(req.body.id,req.body.Client_Name,req.body.Passenger_Name,req.body.DOB,req.body.Mobile_Number,req.body.Seat,req.body.Meal,req.body.Passport_Number,req.body.Passport_Expiry_Date).then(() => {
          res.redirect("/");
     })
     .catch((err) => {
         res.send(err);
     })
})

app.get("/update/:id", (req,res) => {
    // console.log(req.params.id);
    res.render("update_client", {
        id: req.params.id
    })
})

app.get("/delete/:id", (req,res) => {
    db.deleteClientsData(req.params.id).then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        res.send(err);
    })
})

app.get("/addFFN/:Passport_Number", (req,res) => {
    console.log(req.params.Passport_Number);
    res.render("addFFN_client", {
        Passport_Number: req.params.Passport_Number
    })
})

app.post("/addFFN", (req,res) => {
    db.addnewFFN(req.body.Passport_Number,req.body.FFN).then(() => {
        res.redirect("/addednowjoin");
    })
    .catch((err) => {
        res.send(err);
    })
})

app.get("/addednowjoin", (req,res) => {
    db.getAllFFN().then((joinedinfo) => {
        res.render("client1", {
            joinedinfos: joinedinfo
        })
    })
})

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})

