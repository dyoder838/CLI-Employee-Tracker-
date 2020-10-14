const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Proverbs6:36",
  database: "emplpoyees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
console.log("connected")
}

// to get an array of all departments

// function add employee()... everything is inside of this function 
    // 
// connection.querry("SELECT * FROM department", function(err, data){
//     if (err) throw err
            // use dep array in the choices section in inquirer
//     let depArr = data.map(function(dep){
//         return{
//             name:dep.title, 
//             value: dep.id
//         }
//     })
// }// inquirer needs to live inside of the connection.querry