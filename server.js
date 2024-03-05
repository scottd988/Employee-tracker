const table = require('table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

let db = null;
const init = async () => {
    db = mysql.createConnection(
        {
          host: 'localhost',
          // MySQL username,
          user: 'root',
          // TODO: Add MySQL password
          password: 'mypassword',
          database: 'business_db'
        },
      );
      console.log(`Connected to the business database.`)
      console.log(db);
      employeeTracker();
}
// const objInput = {
//     name: Amazon
// }
// const data = await db.query("INSERT INTO department SET ?", objInput);
// console.log(data);

//const results = await db.query("SELECT * FROM department");
//console.log(results[0]);
var employeeTracker =  () => {
    //initiall question
    inquirer.prompt([{
      type: 'list',
      name: 'prompt',
      message: 'What would you like to do?',
      choices: ['View ALL Department', 'View ALL Roles', 'View ALL Employees','Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
      // handle view all departments
      if (answers.prompt === 'View ALL Department') {
        db.query('select * from department', (err, result) => {
          if (err) throw err;
          console.log('viewing ALL departments');
          console.table(result);
          init();
        });
// to view each role
   } else if (answers.prompt === 'View ALL Roles') {
        db.query('select * from role', (err, result) => {
          if (err) throw err;
          console.log('viewing ALL roles');
          console.table(result);
          init();
        });
        // to view all employees
      } else if (answers.prompt === 'View ALL Employees') {
        db.query('select * from employee', (err, result) => {
          if (err) throw err;
          console.log('viewing ALL employees ');
          console.table(result);
          init();
        });
      // to add a department
     } else if (answers.prompt === 'Add A Department') {
        inquirer.prompt([{
          type: 'input',
          name: 'department',
          message: 'Which department would you like to add?',
          validate : departmentInput => {
            if (departmentInput) {
              return true;
            } else {
              console.log('Please enter in a department');
              return false;
            }
          }
        }]).then((answers) => {
            db.query('INSERT INTO department (name) VALUES (?)', [answers.department], (err, result) => {
              if (err) throw err;
              console.log('Added department');
              init();
            });                
            });
        }
      // to add a role
    else if (answers.prompt === 'Add A Role') {
        db.query('SELECT * FROM department', (err, department) => {
      inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?',
        validate : titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter in a title');
            return false;
          }
        }
      }, {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate : salaryInput => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter in a salary');
            return false;
          }
        }
      }, {
        // adding department
        type: 'list',
        name: 'department',
        message: 'What department does the role belong to?',
        choices: () => {
          let choiceArr = [];
          department.map(department => {
            choiceArr.push(department.name);
          })
          
          return choiceArr;
        }
      }
    ]).then((answers) => {
    for (let i = 0; i < results.length; i++) {
      if (results[i].name === answers.department) {
        var department = results[i].id;
      }
    }
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, department], (err, department) => {
      if (err) throw err;
      console.log("Role has been added!");
      init();
    });
        })
    });
        //
 } else if (answers.prompt === 'Add an employee') {
        db.query('SELECT * FROM role',  (err, department) => {
            if (err) throw err;
            inquirer.prompt([
              {
                type: 'input',
                name: 'role',
                message: 'What is the employee\'s role?',
                validate: (value) => {
                  if (value) {
                    return true;
                  } else {
                    return false;
                  }
                }
              },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the employee\'s salary?',
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return false;
            }
          }
        }, {
            //department
          type: 'list',
          name: 'department',
          message: 'What is the employee\'s department?',
          choices: () => {
            let choiceArr = [];
            for (let i = 0; i < results.length; i++) {
              choiceArr.push(results[i].name);
            } 
            return choiceArr;
          }
        }
    ]).then((answers) => {
        // compares answer and stores in variable
      for (let i = 0; i < results.length; i++) {
        if (results[i].name === answers.department) {
          var department = results[i].id;
        }
      }
      // inserts into database
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.role}", ${answers.salary}, ${department})`, (err, result) => {
        if (err) throw (err);
        console.log("Role added!");
        init();
      });
    })
      });
         //

      } else if (answers.prompt === "Add an employee") {
        // query to get all roles
        db.query(`SELECT * FROM role`, (err, results) => {
          if (err) throw (err);
          inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is the employee\'s first name?',
              validate: (value) => {
                if (value) {
                  return true;
                } else {
                  return false;
                  console.log('Please add first name.');
                }
                }
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is the employee\'s last name?',
              validate: (value) => {
                if (value) {
                  return true;
                } else {
                    console.log('Please add last name.');
                    return false;
                }
                }
              }, 
            {
              type: 'list',
              name: 'role_id',
              message: 'What is the employee\'s role?',
              choices: () => {
                let choiceArr = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArr.push(results[i].title);
                }
                return choiceArr;
              }
            },
            {
              type: 'input',
              name: 'manager_id',
              message: 'Who is the employee\'s manager?',
              validate: (value) => {
                if (value) {
                  return true;
                } else {
                console.log('Please add manager\'s name.');
                return false;
              }
            }
        }
          ]).then((answers) => {
            for (var i =0; i < results.length; i++) {
              if (answers.role_id === results[i].title) {
                answers.role_id = results[i].id;
              }
            }
            db.query(`INSERT INTO employee (first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role_id, manager_id: answers.manager_id) VALUES (?, ?, ?, ?)`,[answers.firstName, answers.lastName, role.id, answers.manager.id], (err, results) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                init();
            });
          })
        });

      } else if (answers.prompt === 'Update Employee Role') {
          db.query(`SELECT * FROM employee`, (err, results) => {
              if (err) throw err;
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'employee',
                  message: 'Which employee would you like to update?',
                  choices: function() {
                    var choiceArray = [];
                    for (var i =0; i < results.length; i++) {
                      choiceArray.push(results[i].first_name);
                    }
                    return choiceArray;

                  }
                },
                {
                  type: 'list',
                  name: 'role',
                  message: 'What is the new role?',
                  choices: function() {
                    var choiceArr = [];
                    for (var i =0; i < results.length; i++) {
                      choiceArr.push(results[i].title);
                    }
                    return choiceArr;
                  }
                }
            ]).then((answers) => {
                for (var i =0; i < results.length; i++) {
                  if (results[i].first_name === answers.employee) {
                    var name = results[i].first_name;
                  }
                }
                for (var i =0; i < results.length; i++) {
                  if (results[i].title === answers.role) {
                    var role = results[i].title;
                  }
                }
                db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {first_name: name}], (err, res) => {
                    if (err) throw err;
                    console.log(`${name} is now a ${role}`);
                    init();
                });
            })
      });

    
    } else if (answers.prompt === 'Log out') {
        db.end();
        console.log('bye')
    };     
    })
}
init();