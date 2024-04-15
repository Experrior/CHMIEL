-- Create Table USERS
CREATE TABLE IF NOT EXISTS USERS (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('USER', 'ADMIN')),
  birth_date DATE DEFAULT NULL,
  phone_number VARCHAR DEFAULT NULL
);

-- Create Table GROUPS
CREATE TABLE IF NOT EXISTS GROUPS (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR UNIQUE NOT NULL
);

-- Create Table GROUPS_USERS
CREATE TABLE IF NOT EXISTS GROUPS_USERS (
  user_id INTEGER,
  group_id INTEGER,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (user_id) REFERENCES USERS(id),
  FOREIGN KEY (group_id) REFERENCES GROUPS(id)
);

-- Create Table SPRINTS
CREATE TABLE IF NOT EXISTS SPRINTS (
  id SERIAL PRIMARY KEY,
  sprint_name VARCHAR NOT NULL,
  group_id INTEGER REFERENCES GROUPS(id),
  start_time TIMESTAMP NOT NULL,
  stop_time TIMESTAMP NOT NULL,
  logged BOOLEAN NOT NULL,
  CONSTRAINT unique_sprint_group_name UNIQUE (sprint_name, id)
);

-- Create Table TASKS
CREATE TABLE IF NOT EXISTS TASKS (
  id SERIAL PRIMARY KEY,
  asignee_id INTEGER REFERENCES USERS(id),
  reported_id INTEGER REFERENCES USERS(id),
  group_id INTEGER REFERENCES GROUPS(id),
  sprint_id INTEGER REFERENCES SPRINTS(id),
  name VARCHAR NOT NULL,
  description VARCHAR,
  logged_hours FLOAT,
  time_estimate FLOAT NOT NULL,
  status VARCHAR CHECK (status IN ('backlog', 'open', 'in progress', 'review', 'closed')),
  is_epic BOOLEAN NOT NULL,
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
