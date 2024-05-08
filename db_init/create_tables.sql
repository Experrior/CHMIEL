
-- Create Table USERS
CREATE TABLE IF NOT EXISTS USERS (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('USER', 'ADMIN')),
  address VARCHAR DEFAULT NULL,
  birth_date DATE DEFAULT NULL,
  phone_number VARCHAR DEFAULT NULL
);

-- Create Table PROJECTS
CREATE TABLE IF NOT EXISTS PROJECTS (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR NOT NULL,
  project_owner INTEGER REFERENCES USERS(id)
);

-- Create Table PROJECTS_USERS
CREATE TABLE IF NOT EXISTS PROJECTS_USERS (
  project_id INTEGER,
  user_id INTEGER,
  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES PROJECTS(id),
  FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Create Table SPRINTS
CREATE TABLE IF NOT EXISTS SPRINTS (
  id SERIAL PRIMARY KEY,
  sprint_name VARCHAR NOT NULL,
  project_id INTEGER REFERENCES PROJECTS(id),
  start_time TIMESTAMP,
  stop_time TIMESTAMP,
  starting_task_count INTEGER NOT NULL DEFAULT 0,
  ending_task_count INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT unique_sprint_project_name UNIQUE (sprint_name, id)
);

-- Create Table TASKS
CREATE TABLE IF NOT EXISTS TASKS (
  id SERIAL PRIMARY KEY,
  assignee_id INTEGER REFERENCES USERS(id),
  reporter_id INTEGER REFERENCES USERS(id),
  project_id INTEGER REFERENCES PROJECTS(id),
  sprint_id INTEGER REFERENCES SPRINTS(id),
  name VARCHAR NOT NULL,
  description VARCHAR,
  logged_hours FLOAT,
  time_estimate FLOAT NOT NULL,
  status VARCHAR CHECK (status IN ('backlog', 'open', 'in_progress', 'review', 'closed')),
  is_epic BOOLEAN NOT NULL DEFAULT FALSE,
  in_epic INTEGER REFERENCES TASKS(id)
);

-- Create Table TASK_COMMENTS
CREATE TABLE IF NOT EXISTS TASK_COMMENTS (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES TASKS(id),
  message VARCHAR NOT NULL,
  author_id INTEGER REFERENCES USERS(id),
  logged BOOLEAN NOT NULL
);


CREATE SEQUENCE tasks_task_id_seq START WITH 1