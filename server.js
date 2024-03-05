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
}
// const objInput = {
//     name: Amazon
// }
// const data = await db.query("INSERT INTO department SET ?", objInput);
// console.log(data);

const results = await db.query("SELECT * FROM department");
console.log(results[0]);

init();
