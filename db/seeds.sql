INSERT INTO department (name) 
VALUES 
("Accounting"), 
("Engineering"), 
("Legal"), 
("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES 
("Accountant", 125000, 1), 
("Software Engineer", 150000, 2), 
("Lead Engineer", 250000, 2), 
("Lawyer", 190000, 3), 
("Legal Team Lead", 250000, 3), 
("Sales Lead", 100000, 4), 
("Salesperson", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("John", "Doe", 1, NULL), 
("Mike", "Chan", 2, 1), 
("Ashley", "Rodriguez", 3, NULL), 
("Kevin", "Tupik", 4, 3), 
("Kunal", "Singh", 5, NULL), 
("Malia", "Brown", 6, 5), 
("Sarah", "Lourd", 7, NULL), 
("Tom", "Allen", 8, 7);