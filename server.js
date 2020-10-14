const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected")
  start();
});

function start(){

    inquirer.prompt([
        {
            type: "list",
            message: "Good day User! what would you like to do?",
            name:"start",
            choices: ["Add departments, roles, and employees.", "View departments, roles, and employees.", "update roles."]
        },
    ]).then(function (res) {
            
        switch(res.start){
            case "Add departments, roles, and employees.":
                addThings();
                break;
                
            case "View departments, roles, and employees.":
                viewThings();
                break;
    
            case "update roles.":
                updateThings();
                break;
    
                default: 
                console.log("Something went wrong!");
                break;
        };

    })   
}
//TODO: addThings function 
function addThings(){
    
    console.log("adding things");
    
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to ADD?",
            name: "addList",
            choices: ["Add departments", "Add roles", "Add employees"]
        }
    ])
}

//TODO: viewThings function
function viewThings(){
    
    console.log("viewing things");
   
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to VIEW?",
            name: "viewList",
            choices: ["View departments", "View roles", "View employees"]     
        }
    ])
} 

//TODO: updateThings function 
function updateThings(){
    
    console.log("updating things");
    
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to UPDATE?",
            name: "updateList",
            choices: ["Update roles"]   
        }
    ])
}





     //.then(function(answers){
    //     console.log(answers)
        
    //     console.log(generateHtml)
    // })


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