

INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Information Technology'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 100000, 1),
    ('HR', 50000, 1),
    ('Marketing Director', 140000, 2),
    ('Sales', 65000, 2),
    ('IT Director', 195000, 3),
    ('Desktop Support', 100000, 3),
    ('Account Manager', 110000, 4),
    ('Accountant', 90000, 4);
  
INSERT INTO employee
    (First_name, Last_name, role_id, manager_id)
VALUES
    ('Oyin', 'Peterson', 1, NULL),
    ('Thomas', 'Lovett', 2, 1),
    ('Collins', 'Polinsky', 3, NULL),
    ('Milbry', 'Grace', 4, 3),
    ('Jared', 'Wodarz', 4, 3),
    ('Cook', 'Golly', 5, NULL),
    ('Bethany', 'Page', 6, 5),
    ('Galvin', 'Harry', 6, 8),
    ('Haley', 'Elrod', 7, NULL),
    