const { prompt } = require("inquirer");
const db = require("./db/index");
require("console.table");
const connection = require("./db/connection");
//const db = require("./db/connection");

init();

// initial function at NPM start
function init() {
  runPrompts();
}

function runPrompts() {
  prompt([
    {
      // prompt for NPM start
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },

        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the functions from what the user selects
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewAllDepartments();
        break;
      case "VIEW_ROLES":
        viewAllRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewAllEmployees();
        break;
      case "ADD_DEPARTMENT":
        createDepartment();
        break;
      case "ADD_ROLE":
        createRole();
        break;
      case "ADD_EMPLOYEE":
        createEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

//employee view
function viewAllEmployees() {
  db.viewallEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employee);
    })
    .then(() => runPrompts());
}

// roles view
function viewAllRoles() {
  db.viewallRole()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(role);
    })
    .then(() => runPrompts());
}

// department info.
function viewAllDepartments() {
  db.viewallDepartments()
    .then(([rows]) => {
      let department = rows;
      console.log("\n");
      console.table(department);
    })
    .then(() => runPrompts());
}

// Add a role
function createRole() {
  db.allDepartments().then(([rows]) => {
    let department = rows;
    const departmentChoices = department.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary rate?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role fall in under?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.addRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => runPrompts());
    });
  });
}

// Add a department
function createDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.addDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => runPrompts());
  });
}

// Add an employee
function createEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What's the employee's first name?",
    },
    {
      name: "last_name",
      message: "What's the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.First_name;
    let lastName = res.Last_name;

    db.allRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What's the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.allEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who's the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                First_name: firstName,
                Last_name: lastName,
              };

              db.addEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => runPrompts());
        });
      });
    });
  });
}

//to update an employees information
function updateEmployeeRole() {
  db.allEmployees().then(([rows]) => {
    let employee = rows;
    const employeeChoices = employee.map(({ id, First_name, Last_name }) => ({
      name: `${First_name} ${Last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.allRoles().then(([rows]) => {
        let role = rows;
        const roleChoices = role.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "What's the new role of this employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Employee's role is updated"))
          .then(() => runPrompts());
      });
    });
  });
}
// Quit the application
function quit() {
  process.exit();
}
