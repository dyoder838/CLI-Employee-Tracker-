            {
            type: "input", 
            name: "addDepartments",
            message: "Type the name of the department you would like to add.", 
            when: function(response){
                return response.addList === "Add departments";
            }
        },
        {
            type: "input", 
            name: "addEmployeeRoles",
            message: "Type the name of the role you would like to add.", 
            when: function(response){
                return response.addList === "Add roles";
            }
        },  
        {
            type: "input", 
            name: "addEmployees",
            message: "Type the name of the employee you would like to add.", 
            when: function(response){
                return response.addList === "Add employees";
            }
        }    

    ]).then(function (res) {
        // This switch function routes the user input to three other functions
        switch(res.addList){
            case "Add departments":
                const dep = new Department(res.name, res.id, res.email, res.officeNumber);
                ansArr.push(man);
                break;
                
            case "Add roles":
                break;
    
            case "Add employees":

                break;
    
                default: 
                console.log("Something went wrong!");
                break;
        };