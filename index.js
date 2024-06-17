const express = require("express");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
const path = require("path");
const methodOverride = require('method-override')
const { faker } = require('@faker-js/faker');
const { connect } = require("http2");

// Accessing env variables:
dotenv.config();

const app = express();
let PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
});

// Setting up ejs engine:
app.set("view engine","ejs");

// Setting up static files:
app.use(express.static(path.join(__dirname,"public")));

// Setting up views:
app.set("views",path.join(__dirname,"/views"));

// Form method-override
app.use(methodOverride('_method'));

// Setting up Post request
app.use(express.urlencoded({extended:true}));

// Database setup:
const connection = mysql2.createConnection({
    host:"localhost",
    user:"root",
    database:"sqlConnectionExpress",
    password:"#Masternipit1",
});
let showQuery = "Select count(id) from user";

// Generating unique id
function createRandomUser(){
    return [
      faker.string.uuid().slice(0,20)
    ];
  }

// SQL Functionalities:
let insertData = (id,username,email,password)=>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)",[id,username,email,password],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        });
    })
}
let countEntries = ()=>{
    return new Promise((resolve,reject)=>{
        connection.query(showQuery,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}
let fetchEntries = ()=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM user",(err,result)=>{
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

let updateRow = (id,username,email)=>{
    return new Promise((resolve,reject)=>{
        connection.query(`UPDATE user SET username = "${username}", email= "${email}" where id = "${id}"`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}
let deleteRow = (id)=>{
    return new Promise((resolve,reject)=>{
        connection.query('DELETE from user where id = ?',[id],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}
// Routes:
app.get("/",(req,res)=>{
    countEntries().then((count)=>{
        let countObj = count[0];
        res.render("home.ejs",{countObj});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Internal Server Error");
    })
});

app.get("/user",(req,res)=>{
    fetchEntries().then((entries)=>{
        res.render("entries.ejs",{entries});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
    
});

app.post("/user/edit/:id",(req,res)=>{
    let id = req.params.id;
    res.render("search.ejs",{id});
});

app.get("/user/add",(req,res)=>{
    res.render("addForm.ejs");
})

app.post("/user",(req,res)=>{
    let id = createRandomUser();
    insertData(id[0],req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect("/user");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
})
app.patch("/user/:id",(req,res)=>{
    let id = req.params.id;
    console.log(req.body);
    updateRow(id,req.body.username,req.body.email).then(()=>{
        res.redirect("/user");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Internal server error");
    })
});

app.delete("/user/:id",(req,res)=>{
    let id = req.params.id;
    deleteRow(id).then((result)=>{
        res.redirect("/user");
    }).catch(()=>{
        res.status(500).send("Internal Server Error");
    })
});

// View Databases
app.get("/user/db",(req,res)=>{
    connection.query("SHOW DATABASES",(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            res.render("databaseEntreis.ejs",{result});
        }
    })
})

// Delete Database
app.delete("/user/db/:dbname",(req,res)=>{
    connection.query(`DROP DATABASE ${req.params.dbname}`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            res.redirect("/user/db");
        }
    })
})

// Create Database
app.post("/user/db/add",(req,res)=>{
    console.log(req.body);
    connection.query(`create database ${req.body.database}`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            res.redirect("/user/db");
        }
    })
})