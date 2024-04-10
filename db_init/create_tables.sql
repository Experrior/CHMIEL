-- Create Table USERS
CREATE TABLE IF NOT EXISTS USERS (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('USER', 'ADMIN'))
);

-- Create Table GROUPS
CREATE TABLE IF NOT EXISTS GROUPS (
  groupId SERIAL PRIMARY KEY,
  groupName VARCHAR UNIQUE NOT NULL
);

-- Create Table GROUP_USERS
CREATE TABLE IF NOT EXISTS GROUP_USERS (
  user_id INTEGER,
  groupId INTEGER,
  PRIMARY KEY (user_id, groupId),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (groupId) REFERENCES GROUPS(groupId)
);

-- Create Table SPRINTS
CREATE TABLE IF NOT EXISTS SPRINTS (
  sprintId SERIAL PRIMARY KEY,
  sprintName VARCHAR NOT NULL,
  groupId INTEGER REFERENCES GROUPS(groupId),
  startTime TIMESTAMP NOT NULL,
  stopTime TIMESTAMP NOT NULL,
  logged BOOLEAN NOT NULL,
  CONSTRAINT unique_sprint_groupName UNIQUE (sprintName, groupId)
);

-- Create Table TASKS
CREATE TABLE IF NOT EXISTS TASKS (
  taskId SERIAL PRIMARY KEY,
  asigneeId INTEGER REFERENCES USERS(user_id),
  reportedId INTEGER REFERENCES USERS(user_id),
  groupId INTEGER REFERENCES GROUPS(groupId),
  sprintId INTEGER REFERENCES SPRINTS(sprintId),
  name VARCHAR NOT NULL,
  description VARCHAR,
  loggedHours FLOAT,
  timeEstimate FLOAT NOT NULL,
  status VARCHAR CHECK (status IN ('backlog', 'open', 'in progress', 'review', 'closed')),
  isEpic BOOLEAN NOT NULL,
  inEpic INTEGER REFERENCES TASKS(taskId)
);

-- Create Table TASK_COMMENTS
CREATE TABLE IF NOT EXISTS TASK_COMMENTS (
  taskCommentId SERIAL PRIMARY KEY,
  taskId INTEGER REFERENCES TASKS(taskId),
  message VARCHAR NOT NULL,
  authorId INTEGER REFERENCES USERS(user_id),
  logged BOOLEAN NOT NULL
);
