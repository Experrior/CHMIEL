-- Inserting realistic groups
INSERT INTO GROUPS (groupName) VALUES
('Engineering Department'),
('Marketing Team'),
('Sales Division'),
('Customer Support Team');

CREATE VIEW engineering_department_view AS
SELECT groupId FROM GROUPS WHERE groupName = 'Engineering Department';

CREATE VIEW marketing_team_view AS
SELECT groupId FROM GROUPS WHERE groupName = 'Marketing Team';

CREATE VIEW sales_division_view AS
SELECT groupId FROM GROUPS WHERE groupName = 'Sales Division';

CREATE VIEW customer_support_team_view AS
SELECT groupId FROM GROUPS WHERE groupName = 'Customer Support Team';


-- Inserting users for Engineering Department
INSERT INTO USERS (first_name, last_name, email, password, role)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'password', 'ADMIN'),
('Alice', 'Smith', 'alice.smith@example.com', 'password', 'USER'),
('Bob', 'Johnson', 'bob.johnson@example.com', 'password', 'USER'),
('Emma', 'Brown', 'emma.brown@example.com', 'password', 'USER'),
('Michael', 'Davis', 'michael.davis@example.com', 'password', 'USER');

-- Inserting users for Marketing Team
INSERT INTO USERS (first_name, last_name, email, password, role)
VALUES 
('Emily', 'Wilson', 'emily.wilson@example.com', 'password', 'ADMIN'),
('James', 'Taylor', 'james.taylor@example.com', 'password', 'USER'),
('Sophia', 'Anderson', 'sophia.anderson@example.com', 'password', 'USER'),
('William', 'Martinez', 'william.martinez@example.com', 'password', 'USER'),
('Olivia', 'Garcia', 'olivia.garcia@example.com', 'password', 'USER');

-- Inserting users for Sales Division
INSERT INTO USERS (first_name, last_name, email, password, role)
VALUES 
('Daniel', 'Miller', 'daniel.miller@example.com', 'password', 'ADMIN'),
('Ava', 'Rodriguez', 'ava.rodriguez@example.com', 'password', 'USER'),
('Logan', 'Lee', 'logan.lee@example.com', 'password', 'USER'),
('Madison', 'Hernandez', 'madison.hernandez@example.com', 'password', 'USER'),
('Jackson', 'Gonzalez', 'jackson.gonzalez@example.com', 'password', 'USER');

-- Inserting users for Customer Support Team
INSERT INTO USERS (first_name, last_name, email, password, role)
VALUES 
('Liam', 'Lopez', 'liam.lopez@example.com', 'password', 'ADMIN'),
('Ella', 'Perez', 'ella.perez@example.com', 'password', 'USER'),
('Mia', 'Sanchez', 'mia.sanchez@example.com', 'password', 'USER'),
('Noah', 'Rivera', 'noah.rivera@example.com', 'password', 'USER'),
('Isabella', 'Torres', 'isabella.torres@example.com', 'password', 'USER');



-- Inserting users into Engineering Department group
INSERT INTO GROUP_USERS (user_id, groupId)
SELECT u.user_id, g.groupId
FROM USERS u
         CROSS JOIN GROUPS g
WHERE g.groupName = 'Engineering Department'
  AND u.email IN ('john.doe@example.com', 'alice.smith@example.com', 'bob.johnson@example.com', 'emma.brown@example.com', 'michael.davis@example.com');

-- Inserting users into Marketing Team group
INSERT INTO GROUP_USERS (user_id, groupId)
SELECT u.user_id, g.groupId
FROM USERS u
         CROSS JOIN GROUPS g
WHERE g.groupName = 'Marketing Team'
  AND u.email IN ('emily.wilson@example.com', 'james.taylor@example.com', 'sophia.anderson@example.com', 'william.martinez@example.com', 'olivia.garcia@example.com');

-- Inserting users into Sales Division group
INSERT INTO GROUP_USERS (user_id, groupId)
SELECT u.user_id, g.groupId
FROM USERS u
         CROSS JOIN GROUPS g
WHERE g.groupName = 'Sales Division'
  AND u.email IN ('daniel.miller@example.com', 'ava.rodriguez@example.com', 'logan.lee@example.com', 'madison.hernandez@example.com', 'jackson.gonzalez@example.com');

-- Inserting users into Customer Support Team group
INSERT INTO GROUP_USERS (user_id, groupId)
SELECT u.user_id, g.groupId
FROM USERS u
         CROSS JOIN GROUPS g
WHERE g.groupName = 'Customer Support Team'
  AND u.email IN ('liam.lopez@example.com', 'ella.perez@example.com', 'mia.sanchez@example.com', 'noah.rivera@example.com', 'isabella.torres@example.com');


-- Inserting sprints for Engineering Department
INSERT INTO SPRINTS (sprintName, groupId, startTime, stopTime, logged)
VALUES
    ('Sprint 1', (SELECT groupId FROM engineering_department_view), '2024-04-03', '2024-04-17', TRUE),
    ('Sprint 2', (SELECT groupId FROM engineering_department_view), '2024-04-17', '2024-05-01', TRUE),
    ('Sprint 3', (SELECT groupId FROM engineering_department_view), '2024-05-01', '2024-05-15', FALSE),
    ('Sprint 4', (SELECT groupId FROM engineering_department_view), '2024-05-15', '2024-05-29', FALSE),
    ('Sprint 5', (SELECT groupId FROM engineering_department_view), '2024-05-29', '2024-06-12', FALSE),
    ('Sprint 6', (SELECT groupId FROM engineering_department_view), '2024-06-12', '2024-06-26', FALSE),
    ('Sprint 7', (SELECT groupId FROM engineering_department_view), '2024-06-26', '2024-07-10', FALSE),
    ('Sprint 8', (SELECT groupId FROM engineering_department_view), '2024-07-10', '2024-07-24', FALSE),
    ('Sprint 9', (SELECT groupId FROM engineering_department_view), '2024-07-24', '2024-08-07', FALSE);


-- Inserting sprints for Marketing Team
WITH team AS (
    SELECT groupId FROM GROUPS WHERE groupName = 'Marketing Team'
)
INSERT INTO SPRINTS (sprintName, groupId, startTime, stopTime, logged)
VALUES
    ('Sprint 1', (SELECT groupId FROM team), '2024-04-03', '2024-04-17', TRUE),
    ('Sprint 2', (SELECT groupId FROM team), '2024-04-17', '2024-05-01', TRUE),
    ('Sprint 3', (SELECT groupId FROM team), '2024-05-01', '2024-05-15', FALSE),
    ('Sprint 4', (SELECT groupId FROM team), '2024-05-15', '2024-05-29', FALSE),
    ('Sprint 5', (SELECT groupId FROM team), '2024-05-29', '2024-06-12', FALSE),
    ('Sprint 6', (SELECT groupId FROM team), '2024-06-12', '2024-06-26', FALSE),
    ('Sprint 7', (SELECT groupId FROM team), '2024-06-26', '2024-07-10', FALSE),
    ('Sprint 8', (SELECT groupId FROM team), '2024-07-10', '2024-07-24', FALSE),
    ('Sprint 9', (SELECT groupId FROM team), '2024-07-24', '2024-08-07', FALSE);

-- Inserting sprints for Marketing Team
WITH team AS (
    SELECT groupId FROM GROUPS WHERE groupName = 'Sales Division'
)
INSERT INTO SPRINTS (sprintName, groupId, startTime, stopTime, logged)
VALUES
    ('Sprint 1', (SELECT groupId FROM team), '2024-04-03', '2024-04-17', TRUE),
    ('Sprint 2', (SELECT groupId FROM team), '2024-04-17', '2024-05-01', TRUE),
    ('Sprint 3', (SELECT groupId FROM team), '2024-05-01', '2024-05-15', FALSE),
    ('Sprint 4', (SELECT groupId FROM team), '2024-05-15', '2024-05-29', FALSE),
    ('Sprint 5', (SELECT groupId FROM team), '2024-05-29', '2024-06-12', FALSE),
    ('Sprint 6', (SELECT groupId FROM team), '2024-06-12', '2024-06-26', FALSE),
    ('Sprint 7', (SELECT groupId FROM team), '2024-06-26', '2024-07-10', FALSE),
    ('Sprint 8', (SELECT groupId FROM team), '2024-07-10', '2024-07-24', FALSE),
    ('Sprint 9', (SELECT groupId FROM team), '2024-07-24', '2024-08-07', FALSE);

-- Inserting sprints for Marketing Team
WITH team AS (
    SELECT groupId FROM GROUPS WHERE groupName = 'Customer Support Team'
)
INSERT INTO SPRINTS (sprintName, groupId, startTime, stopTime, logged)
VALUES
    ('Sprint 1', (SELECT groupId FROM team), '2024-04-03', '2024-04-17', TRUE),
    ('Sprint 2', (SELECT groupId FROM team), '2024-04-17', '2024-05-01', TRUE),
    ('Sprint 3', (SELECT groupId FROM team), '2024-05-01', '2024-05-15', FALSE),
    ('Sprint 4', (SELECT groupId FROM team), '2024-05-15', '2024-05-29', FALSE),
    ('Sprint 5', (SELECT groupId FROM team), '2024-05-29', '2024-06-12', FALSE),
    ('Sprint 6', (SELECT groupId FROM team), '2024-06-12', '2024-06-26', FALSE),
    ('Sprint 7', (SELECT groupId FROM team), '2024-06-26', '2024-07-10', FALSE),
    ('Sprint 8', (SELECT groupId FROM team), '2024-07-10', '2024-07-24', FALSE),
    ('Sprint 9', (SELECT groupId FROM team), '2024-07-24', '2024-08-07', FALSE);


-- Inserting example tasks for the first sprint in Engineering Department
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(2, 1, (SELECT groupId FROM engineering_department_view), 1, 'Implement login functionality', 'Implement login functionality for the website', NULL, 20.0, 'open', FALSE, NULL),
(3, 1, (SELECT groupId FROM engineering_department_view), 1, 'Design database schema', 'Design the database schema for the project', NULL, 15.0, 'in progress', FALSE, NULL),
(4, 1, (SELECT groupId FROM engineering_department_view), 1, 'Setup development environment', 'Setup development environment for the project', NULL, 10.0, 'in progress', FALSE, NULL),
(5, 1, (SELECT groupId FROM engineering_department_view), 1, 'Create homepage layout', 'Create the layout for the homepage of the website', NULL, 25.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the first sprint in Marketing Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(7, 6, (SELECT groupId FROM marketing_team_view), 1, 'Develop marketing strategy', 'Develop a marketing strategy for the upcoming product launch', NULL, 30.0, 'in progress', FALSE, NULL),
(8, 6, (SELECT groupId FROM marketing_team_view), 1, 'Create social media posts', 'Create engaging social media posts for the marketing campaign', NULL, 20.0, 'open', FALSE, NULL),
(9, 6, (SELECT groupId FROM marketing_team_view), 1, 'Design promotional materials', 'Design promotional materials such as flyers and banners', NULL, 25.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the first sprint in Sales Division
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(12, 11, (SELECT groupId FROM sales_division_view), 1, 'Contact potential clients', 'Contact potential clients and schedule meetings', NULL, 40.0, 'in progress', FALSE, NULL),
(13, 11, (SELECT groupId FROM sales_division_view), 1, 'Prepare sales pitch', 'Prepare a sales pitch for the product presentation', NULL, 15.0, 'open', FALSE, NULL),
(14, 11, (SELECT groupId FROM sales_division_view), 1, 'Generate leads', 'Generate leads through cold calling and email outreach', NULL, 30.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the first sprint in Customer Support Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(17, 16, (SELECT groupId FROM customer_support_team_view), 1, 'Respond to customer inquiries', 'Respond to customer inquiries and provide assistance', NULL, 35.0, 'open', FALSE, NULL),
(18, 16, (SELECT groupId FROM customer_support_team_view), 1, 'Resolve customer complaints', 'Resolve customer complaints and issues promptly', NULL, 25.0, 'in progress', FALSE, NULL),
(19, 16, (SELECT groupId FROM customer_support_team_view), 1, 'Update knowledge base', 'Update the knowledge base with frequently asked questions', NULL, 20.0, 'backlog', FALSE, NULL);


-- Inserting example tasks for the second sprint in Engineering Department
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(2, 1, (SELECT groupId FROM engineering_department_view), 2, 'Implement user profile page', 'Implement user profile page with edit functionality', NULL, 25.0, 'in progress', FALSE, NULL),
(3, 1, (SELECT groupId FROM engineering_department_view), 2, 'Optimize database queries', 'Optimize database queries for improved performance', NULL, 20.0, 'open', FALSE, NULL),
(4, 1, (SELECT groupId FROM engineering_department_view), 2, 'Integrate third-party APIs', 'Integrate third-party APIs for additional functionality', NULL, 30.0, 'backlog', FALSE, NULL),
(5, 1, (SELECT groupId FROM engineering_department_view), 2, 'Bug fixes', 'Fix bugs reported during the previous sprint', NULL, 15.0, 'in progress', FALSE, NULL);

-- Inserting example tasks for the second sprint in Marketing Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(7, 6, (SELECT groupId FROM marketing_team_view), 2, 'Launch social media campaign', 'Launch social media campaign to promote the product', NULL, 35.0, 'in progress', FALSE, NULL),
(8, 6, (SELECT groupId FROM marketing_team_view), 2, 'Create marketing content', 'Create content for email marketing and blog posts', NULL, 30.0, 'open', FALSE, NULL),
(9, 6, (SELECT groupId FROM marketing_team_view), 2, 'Attend marketing conference', 'Attend marketing conference to network and gain insights', NULL, 40.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the second sprint in Sales Division
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(12, 11, (SELECT groupId FROM sales_division_view), 2, 'Conduct product demo', 'Conduct product demo for potential clients', NULL, 45.0, 'in progress', FALSE, NULL),
(13, 11, (SELECT groupId FROM sales_division_view), 2, 'Follow up with leads', 'Follow up with leads generated during the previous sprint', NULL, 20.0, 'open', FALSE, NULL),
(14, 11, (SELECT groupId FROM sales_division_view), 2, 'Prepare sales reports', 'Prepare sales reports to track progress and performance', NULL, 25.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the second sprint in Customer Support Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(17, 16, (SELECT groupId FROM customer_support_team_view), 2, 'Resolve customer queries', 'Resolve customer queries and provide solutions', NULL, 40.0, 'open', FALSE, NULL),
(18, 16, (SELECT groupId FROM customer_support_team_view), 2, 'Update support documentation', 'Update support documentation with new features and fixes', NULL, 30.0, 'in progress', FALSE, NULL),
(19, 16, (SELECT groupId FROM customer_support_team_view), 2, 'Review customer feedback', 'Review customer feedback and suggest improvements', NULL, 20.0, 'backlog', FALSE, NULL);


-- Inserting example tasks for the third sprint in Engineering Department
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(2, 1, (SELECT groupId FROM engineering_department_view), 3, 'Implement email notification', 'Implement email notification system for user actions', NULL, 30.0, 'open', FALSE, NULL),
(3, 1, (SELECT groupId FROM engineering_department_view), 3, 'Optimize frontend performance', 'Optimize frontend performance for faster page loads', NULL, 25.0, 'in progress', FALSE, NULL),
(4, 1, (SELECT groupId FROM engineering_department_view), 3, 'Implement user feedback feature', 'Implement feature to gather user feedback', NULL, 35.0, 'backlog', FALSE, NULL),
(5, 1, (SELECT groupId FROM engineering_department_view), 3, 'Integration testing', 'Perform integration testing for new features', NULL, 20.0, 'in progress', FALSE, NULL);

-- Inserting example tasks for the third sprint in Marketing Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(7, 6, (SELECT groupId FROM marketing_team_view), 3, 'Analyze marketing campaign results', 'Analyze the results of the ongoing marketing campaign', NULL, 40.0, 'in progress', FALSE, NULL),
(8, 6, (SELECT groupId FROM marketing_team_view), 3, 'Create marketing collateral', 'Create marketing collateral for upcoming events', NULL, 30.0, 'open', FALSE, NULL),
(9, 6, (SELECT groupId FROM marketing_team_view), 3, 'Attend industry event', 'Attend industry event to promote the brand', NULL, 45.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the third sprint in Sales Division
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(12, 11, (SELECT groupId FROM sales_division_view), 3, 'Finalize sales pitch', 'Finalize the sales pitch for the product presentation', NULL, 50.0, 'in progress', FALSE, NULL),
(13, 11, (SELECT groupId FROM sales_division_view), 3, 'Schedule follow-up meetings', 'Schedule follow-up meetings with interested clients', NULL, 25.0, 'open', FALSE, NULL),
(14, 11, (SELECT groupId FROM sales_division_view), 3, 'Review sales strategy', 'Review and refine the sales strategy for better results', NULL, 30.0, 'backlog', FALSE, NULL);

-- Inserting example tasks for the third sprint in Customer Support Team
INSERT INTO TASKS (asigneeId, reportedId, groupId, sprintId, name, description, loggedHours, timeEstimate, status, isEpic, inEpic)
VALUES 
(17, 16, (SELECT groupId FROM customer_support_team_view), 3, 'Improve response time', 'Implement measures to improve response time to customer queries', NULL, 45.0, 'open', FALSE, NULL),
(18, 16, (SELECT groupId FROM customer_support_team_view), 3, 'Update support articles', 'Update support articles with new troubleshooting steps', NULL, 35.0, 'in progress', FALSE, NULL),
(19, 16, (SELECT groupId FROM customer_support_team_view), 3, 'Analyze customer satisfaction', 'Analyze customer satisfaction survey results', NULL, 25.0, 'backlog', FALSE, NULL);
