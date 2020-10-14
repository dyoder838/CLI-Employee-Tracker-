INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Representative", 70000, department_id);
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Production");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Administrative Assistant", 50000, 0);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 45000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Production Manager", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Worker", 55000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Grace", "Pritchard", 0, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kathy", "Miller", 1, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Swan", 2, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sun", "Lee", 2, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rajesh", "Signh", 4, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erin", "Smith", 3, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Jones", 6, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Kinds", 6, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Horowitz", 5, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jose", "Aguilar", 5, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Worley", 6, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Juan", "Dos Santos", 6, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Cruz", 6, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Dame", 6, 0);