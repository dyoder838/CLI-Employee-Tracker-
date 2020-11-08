const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path")
require("console.table")
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected")
    start();
});

// This starts the line of questioning  --------------------------------------- Start
// Answers are linked to functions that start the appropriate line of questioning 
function start() {

    inquirer.prompt([
        {
            type: "list",
            message: "Good day User! what would you like to do?",
            name: "start",
            choices: ["Add departments, roles, and employees.", "View departments, roles, and employees.", "update roles."]
        },
    ]).then(function (res) {
        // This switch function routes the user input to three other functions
        switch (res.start) {
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

// --------------------------------------------------------------------------------------    Add things  
function addThings() {

    console.log("adding things");

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to ADD?",
            name: "addList",
            choices: ["Add departments", "Add roles", "Add employees"]
        },
    ]).then(function (res) {

        switch (res.addList) {
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
// ------------------------------------------------------- Add departments
function addDepartments() {

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
    ]).then(function (answer) {

        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: answer.addDepartment
            },
            function (err) {
                if (err) throw err;
                console.log("You are departmentally sound");
            }
        );

        switch (answer.afterAddDepartment) {

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

// -----------------------------------------------------------------Add roles
function addRoles() {

    // Get all data from department table
    connection.query("SELECT * FROM department", function (err, data) {

        if (err) throw err
        
        // use depArr in the choices section in inquirer for dynamic selection
        let depArr = data.map(function (dep) {
            return {
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
                choices: [55000, 45000, 35000, 25000]
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
        ]).then(function (answer) {

            connection.query(

                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId
                },

                function (err) {
                    if (err) throw err;
                    console.log("You have roles");
                }
            );

            switch (answer.afterAddRole) {

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

// -------------------------------------------------------------------Add employees
function addEmployees() {

    console.log("add an employee");

    // Get all data from role table 
    connection.query("SELECT * FROM role", function (err, data) {

        if (err) throw err

        // use roleArr in the choices section in inquirer - creates an array of current roles by title with the value of their id for 
        // CLI user to chose from
        // Note: Managers role have been hard coded to id# 1
        let roleArr = data.map(function (role) {
            return {
                name: role.title,
                value: role.id
            }
        });

        // Get all managers by process of elimination - if they don't have a manager_id, they are a manager. 
        // note: if managers can have managers, this will not work. 
        connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, data) {

            if (err) throw err
           
            // Array of managers by first and last name, their values are their id 
            
            let empArr = data.map(function (employee) {
                return {
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
                    type: "list",
                    message: "What is the role of the employee you would like to add?",
                    name: "roleId",
                    choices: roleArr
                },
                {
                    type: "list",
                    message: "Who is this employees manager?",
                    name: "managerId",
                    choices: empArr,
                    when: function (response) {
                        return response.roleId !== 1
                    }
                },
                {
                    type: "list",
                    message: "That was so fun!, what would you like to do now?",
                    name: "afterAddEmployee",
                    choices: ["Add another department", "Add another role", "Add another employee", "Return to main menu", "Quit"]
                }
            ]).then(function (answer) {

                connection.query(

                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleId,
                        manager_id: answer.managerId
                    },

                    function (err) {
                        if (err) throw err;
                        console.log("You have employees");
                    }
                );

                switch (answer.afterAddEmployee) {

                    case "Add another department":
                        addDepartments();
                        break;

                    case "Add another role":
                        addRoles();
                        break;

                    case "Add another employee":
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
    })

}

// ----------------------------------------------------------------------------------------- viewThings function
function viewThings() {

    console.log("viewing things");

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to VIEW?",
            name: "viewList",
            choices: ["View departments", "View roles", "View employees", "Return to main menu", "Quit"]
        }
    ]).then(function (res) {

        switch (res.viewList) {
            case "View departments":
                viewDepartments();
                break;

            case "View roles":
                viewRoles();
                break;

            case "View employees":
                viewEmployees();
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
        };
    })
}

// ----------------------------------------------------------View Employees
function viewEmployees() {

    console.log("view an employee");

    connection.query("SELECT * FROM employee", function (err, data) {

        if (err) throw err

        console.table(data);
        viewThings();
    })

}

// ----------------------------------------------------------- View roles
function viewRoles() {

    console.log("view roles");

    connection.query("SELECT * FROM role", function (err, data) {

        if (err) throw err

        console.table(data);
        viewThings();
    })

}

// ---------------------------------------------------------View departments
function viewDepartments() {
    console.log("view a department");

    connection.query("SELECT * FROM department ", function (err, data) {

        if (err) throw err

        console.table(data);
        viewThings();
    })
}

//--------------------------------------------------------------------------------- Update things function 
function updateThings() {

    console.log("updating employee roles");

    // get a list of employees and their roles to chose an employee id from 
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id", function(err, data){

        if(err)throw err

        console.table(data);

        let whosRoleArr = data.map(function (newData) {
                    return {
                        name: newData.first_name +" "+ newData.last_name +" "+ newData.title,
                        value: newData.id
                    }
        })
        // get a list of roles to chose a role id from
        connection.query("SELECT role.id, role.title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id", function (err, roles) {

            if (err) throw err
            console.table(roles)
            let roleArr = roles.map(function (role) {
                return {
                    name: role.title + " " + role.salary + " " + role.department_name,
                    value: role.id
                }
            });
            inquirer.prompt([
                {
                    type: "list",
                    message: "Who's role would you like to UPDATE?",
                    name: "updateList",
                    choices: whosRoleArr
                }, 
                {
                    type: "list",
                    message: "What do you want their new role to be?",
                    name: "newTitle",
                    choices: roleArr
                },
                {
                    type: "list",
                    message: "what would you like to do next?",
                    name: "next",
                    choices: ["Update another employee role.", "Return to main menu", "Quit"]
                },
            ]).then(function (answer) {
                

                connection.query(

                    // update the employee table in the role_id column for the employee with the id ?
                    "UPDATE employee SET role_id=? WHERE id=?", [answer.newTitle, answer.updateList],
        
                    function (err) {
                        if (err) throw err;
                        console.log("You have updated your employee's role");
                    }
                );

                switch (answer.next) {

                    case "Update another employee role.":
                        updateThings();
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
 
    })
    
}  