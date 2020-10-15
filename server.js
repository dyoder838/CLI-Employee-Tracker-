
const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path")

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

// This starts the line of questioning  
function start(){

    inquirer.prompt([
        {
            type: "list",
            message: "Good day User! what would you like to do?",
            name:"start",
            choices: ["Add departments, roles, and employees.", "View departments, roles, and employees.", "update roles."]
        },
    ]).then(function (res) {
        // This switch function routes the user input to three other functions
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
        },
    ]).then(function (res) {
        
        switch(res.addList){
            case "Add departments":
                addDepartments();
                break;
                
            case "Add roles":
                addRoles();
                break;
    
            case "Add employees":
                addEmployees();
                break;
    
                default: 
                console.log("Something went wrong!");
                break;
        };
    })   
}
        //TODO: addDepartments
        function addDepartments(){
            
            // console.log("add a department")
            
            inquirer.prompt([
                {
                    type: "list",
                    message: "What department would you like to add",
                    name: "addDepartment", 
                    choices: ["Home", "Mens", "Womans", "kids", "Jewelry", "Beauty", "Shoes"]    
                },
                {
                    type: "list",
                    message: "That was so fun!, what would you like to do now?",
                    name: "afterAddDepartment",
                    choices: ["Add another department", "Add a role", "Add an employee", "Return to main menu", "Quit"]
                }
            ]).then(function(answer) {
                
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        department_name: answer.addDepartment
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("You are departmentally sound");
                    }
                );

                switch(answer.afterAddDepartment){
                    
                    case "Add another department":
                        addDepartments();
                        break;
                
                    case "Add a role":
                        addRoles();
                        break;
    
                    case "Add an employee":
                        addEmployees();
                        break;

                    case "Return to main menu":
                        start();
                        break;
                    
                    case "Quit":
                        connection.end();
                        break;
    
                    default: 
                        console.log("Something went wrong!");
                        break;
                }
            });
        };
        
        //TODO: addRoles
        function addRoles(){
            
            connection.query("SELECT * FROM department", function(err, data){
                
                if (err) throw err
                       // use roleArr in the choices section in inquirer
                let depArr = data.map(function(dep){
                    return{
                        name: dep.department_name + " id:" + dep.id,
                        value: dep.id
                    }
                });
            
                inquirer.prompt([
                    {
                        type: "list",
                        message: "What role would you like to add?",
                        name: "title", 
                        choices: ["Manager", "Senior Associate", "Associate", "Minion"]    
                    },
                    {
                        type: "list",
                        message: "What is this role's annual gross salary?",
                        name: "salary",
                        choices: [ 55000, 45000, 35000, 25000 ]
                    },
                    {
                        type: "list",
                        message: "What department does this role belong to?",
                        name: "departmentId",
                        choices: depArr
                    },
                    {
                        type: "list",
                        message: "That was so fun!, what would you like to do now?",
                        name: "afterAddRole",
                        choices: ["Add another department", "Add another role", "Add an employee", "Return to main menu", "Quit"]
                    }
                ]).then(function(answer) {
                    
                    connection.query(
                       
                        "INSERT INTO role SET ?",
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.departmentId
                        },
                        
                        function(err) {
                            if (err) throw err;
                            console.log("You are departmentally sound");
                        }
                    );

                    switch(answer.afterAddRole){
                        
                        case "Add another department":
                            addDepartments();
                            break;
                    
                        case "Add another role":
                            addRoles();
                            break;
        
                        case "Add an employee":
                            addEmployees();
                            break;

                        case "Return to main menu":
                            start();
                            break;
                        
                        case "Quit":
                            connection.end();
                            break;
        
                        default: 
                            console.log("Something went wrong!");
                            break;
                    }
                });
            })    
        }
        
        //TODO: addEmployees
        function addEmployees(){
            
            console.log("add an employee");

            connection.query("SELECT * FROM role", function(err, data){
                
                if (err) throw err
                       // use roleArr in the choices section in inquirer
                let roleArr = data.map(function(role){
                    return{
                        name: role.title + "at rate" + role.salary,
                        value: role.id
                    }
                });

                connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(err, data){
                
                        if (err) throw err
                    // I want an array of employees who are managers
                    // I need to match the role id of an employee to manager
                    // all employees where role id = whatever manager role id number is
                    let empArr = data.map(function(employee){
                        return{
                            name: employee.first_name + " " + employee.last_name, 
                            value: employee.id
                        }
                        
                    })
                
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What is the first name of the employee you would like to add?",
                            name: "firstName",     
                        },
                        {
                            type: "input",
                            message: "What is the last name of the employee you would like to add?",
                            name: "lastName",     
                        },
                        {
                            // roles are determined in the role section
                            // once roles are input, this field will populate 
                            // this will be a role title and id - user should select the title, the desired outcome is that titles id number
                            type: "list",
                            message: "What is the role of the employee you would like to add?",
                            name: "roleId",
                            choices: roleArr   
                        },
                        {
                            // check for err here, this should return a managers id number 
                            type: "list",
                            message: "Who is this employees manager?",
                            name: "whoManager",
                            choices: empArr,
                            when: function(response){
                                return response.roleId !== "Manager"
                            }
                        },
                        {
                    
                        }, 
                            
                    ])
                })        
            })

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
           // use depArr in the choices section in inquirer
//     let depArr = data.map(function(dep){
//         return{
//             name:dep.title, 
//             value: dep.id
//         }
//     })
// })