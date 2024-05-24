import copy
import datetime
import random

import requests
from requests.exceptions import ConnectTimeout

api = "http://localhost:8084"

session = requests.Session()

try:
    response = session.get(api + '/actuator/health', timeout=5)
except ConnectTimeout:
    api = "http://172.22.0.1:8084"

users = [
    {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "password"},
    {"firstName": "Alice", "lastName": "Smith", "email": "alice.smith@example.com", "password": "password"},
    {"firstName": "Bob", "lastName": "Johnson", "email": "bob.johnson@example.com", "password": "password"},
    {"firstName": "Emma", "lastName": "Brown", "email": "emma.brown@example.com", "password": "password"},
    {"firstName": "Michael", "lastName": "Davis", "email": "michael.davis@example.com", "password": "password"},
    {"firstName": "Emily", "lastName": "Wilson", "email": "emily.wilson@example.com", "password": "password"},
    {"firstName": "James", "lastName": "Taylor", "email": "james.taylor@example.com", "password": "password"},
    {"firstName": "Sophia", "lastName": "Anderson", "email": "sophia.anderson@example.com", "password": "password"},
    {"firstName": "William", "lastName": "Martinez", "email": "william.martinez@example.com", "password": "password"},
    {"firstName": "Olivia", "lastName": "Garcia", "email": "olivia.garcia@example.com", "password": "password"},
    {"firstName": "Daniel", "lastName": "Miller", "email": "daniel.miller@example.com", "password": "password"},
    {"firstName": "Ava", "lastName": "Rodriguez", "email": "ava.rodriguez@example.com", "password": "password"},
    {"firstName": "Logan", "lastName": "Lee", "email": "logan.lee@example.com", "password": "password"},
    {"firstName": "Madison", "lastName": "Hernandez", "email": "madison.hernandez@example.com", "password": "password"},
    {"firstName": "Jackson", "lastName": "Gonzalez", "email": "jackson.gonzalez@example.com", "password": "password"},
    {"firstName": "Liam", "lastName": "Lopez", "email": "liam.lopez@example.com", "password": "password"},
    {"firstName": "Ella", "lastName": "Perez", "email": "ella.perez@example.com", "password": "password"},
    {"firstName": "Mia", "lastName": "Sanchez", "email": "mia.sanchez@example.com", "password": "password"},
    {"firstName": "Noah", "lastName": "Rivera", "email": "noah.rivera@example.com", "password": "password"},
    {"firstName": "Isabella", "lastName": "Torres", "email": "isabella.torres@example.com", "password": "password"}
]
projects_to_make = [
    {"name": "MVP project baseline", "projectOwner": 1},
    {"name": "Strategy & Launch", "projectOwner": 2},
    {"name": "Securing clients", "projectOwner": 3},
    {"name": "QA Long Term analysis", "projectOwner": 4}
]
base_tasks = [
    {
        "reporterId": 1,
        "projectId": "1",
        "sprintId": 4,
        "name": "Develop User Authentication System",
        "description": "Implement a robust user authentication system to ensure secure access to the platform.\nUtilize industry-standard encryption algorithms and best practices.\nFor more information on user authentication, refer to (https://en.wikipedia.org/wiki/Authentication).",
        "timeEstimate": 0,
        "epic": "false",
        "inEpic": "2"
    },
    {
        "reporterId": 1,
        "projectId": "1",
        "sprintId": 4,
        "name": "Deploy Working and Scalable Database System",
        "description": "Create an efficient and scalable database schema to store user data, application settings, and other relevant information.\nConsider the specific requirements of the project and choose appropriate data structures.\nLearn more about database design principles (https://en.wikipedia.org/wiki/Database_design).",
        "timeEstimate": 0,
        "epic": "true"
    },
    {
        "reporterId": 1,
        "projectId": "1",
        "sprintId": 4,
        "name": "Setup Development Environment",
        "description": "Configure the development environment with the necessary tools and libraries for efficient software development.\nInstall IDEs, version control systems, and other required software components.\nCheck out this guide on setting up a development environment (https://en.wikipedia.org/wiki/Integrated_development_environment).",
        "timeEstimate": 0,
        "epic": "false",
        "inEpic": "2"
    },
    {
        "reporterId": 1,
        "projectId": "1",
        "sprintId": 4,
        "name": "Create Homepage Layout",
        "description": "Design an attractive and user-friendly layout for the homepage of the application.\nUse modern design principles and responsive design techniques to ensure compatibility across different devices.\nExplore the basics of web design (https://en.wikipedia.org/wiki/Web_design).",
        "timeEstimate": 0,
        "epic": "false",
        "inEpic": "2"
    },
    {
        "assigneeId": 1,
        "reporterId": 1,
        "projectId": "1",
        "sprintId": 4,
        "name": "Implement Core Functionality",
        "description": "Develop the core features and functionality of the application according to the project requirements.\nFocus on essential tasks such as user registration, profile management, and data manipulation.\nLearn about software development methodologies (https://en.wikipedia.org/wiki/Software_development_process).",
        "timeEstimate": 0,
        "epic": "false",
        "inEpic": "2"
    },
    {
        "assigneeId": "3",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Perform Unit Testing",
        "description": "Write and execute unit tests to verify the correctness of individual components and modules.\nUse testing frameworks and tools to automate the testing process and ensure code quality.\nExplore the importance of unit testing (https://en.wikipedia.org/wiki/Unit_testing).",
        "timeEstimate": "1",
        "epic": "true"
    },
    {
        "assigneeId": "2",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Optimize Performance",
        "description": "Identify and address performance bottlenecks in the application to improve responsiveness and efficiency.\nProfile the codebase, optimize algorithms, and utilize caching mechanisms where applicable.\nLearn more about performance optimization (https://en.wikipedia.org/wiki/Performance_optimization).",
        "timeEstimate": "1",
        "epic": "true"
    },
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Document Codebase",
        "description": "Create comprehensive documentation for the codebase to facilitate understanding, maintenance, and collaboration among team members.\nDocument APIs, data structures, and implementation details using standard documentation tools.\nRead about the importance of code documentation (https://en.wikipedia.org/wiki/Code_documentation).",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "2"
    },
    {
        "assigneeId": "2",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Deploy to Production Environment",
        "description": "Deploy the application to the production environment following established deployment procedures and best practices.\nMonitor deployment process, perform smoke tests, and ensure seamless transition to the live environment.\nLearn about deployment strategies (https://en.wikipedia.org/wiki/Software_deployment).",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "2"
    }
]
tasks = [
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Develop User Authentication System",
        "description": "Implement a robust user authentication system to ensure secure access to the platform.\nUtilize industry-standard encryption algorithms and best practices.\nFor more information on user authentication, refer to [this Wikipedia article](https://en.wikipedia.org/wiki/Authentication).",
        "timeEstimate": "1",
        "epic": "true"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Design Database Schema",
        "description": "Create an efficient and scalable database schema to store user data, application settings, and other relevant information.\nConsider the specific requirements of the project and choose appropriate data structures.\nLearn more about database design principles (https://en.wikipedia.org/wiki/Database_design).",
        "timeEstimate": "1",
        "epic": "true"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "1",
        "name": "Implement Core Functionality",
        "description": "Develop the core features and functionality of the application according to the project requirements.\nFocus on essential tasks such as user registration, profile management, and data manipulation.\nLearn about software development methodologies (https://en.wikipedia.org/wiki/Software_development_process).",
        "timeEstimate": "1",
        "epic": "true"
    }
]
# Subtasks for the first epic task "Develop User Authentication System"
subtasks_auth_system = [
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "3",
        "name": "Implement Login Page UI",
        "description": "Design and implement the user interface for the login page of the application.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "2",
        "name": "Develop Authentication API",
        "description": "Create API endpoints for user authentication, including login, registration, and password reset functionality.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    }
]
# Subtasks for the second epic task "Design Database Schema"
subtasks_db_schema = [
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "2",
        "name": "Define Entity Relationships",
        "description": "Identify and define relationships between different entities in the database schema.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "2",
        "name": "Create Table Definitions",
        "description": "Write SQL scripts to create tables and define their attributes based on the identified entity relationships.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    }
]
# Subtasks for the third epic task "Implement Core Functionality"
subtasks_core_functionality = [
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "2",
        "sprintId": "1",
        "name": "User Registration",
        "description": "Implement user registration functionality, allowing new users to sign up for an account.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "2"
    },
    {
        "assigneeId": "1",
        "reporterId": "1",
        "projectId": "2",
        "sprintId": "1",
        "name": "Profile Management",
        "description": "Develop user profile management features, allowing users to update their personal information and preferences.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "2"
    }
]

more_tasks = [
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "3",
        "name": "Implement User Authentication",
        "description": "Develop the user authentication module to allow users to register, log in, and manage their accounts securely.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "4",
        "name": "Design Database Schema",
        "description": "Create the database schema for the application, including tables, relationships, and constraints.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "5",
        "name": "Implement User Profile Management",
        "description": "Develop the functionality to allow users to manage their profiles, including updating personal information and profile pictures.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "6",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "1",
        "epic": "false",
        "inEpic": "1"
    },

    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "2",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "12",
        "epic": "false"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "3",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "10",
        "epic": "false"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "4",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "5",
        "epic": "false"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "5",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "4",
        "epic": "false"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "6",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "7",
        "epic": "false"
    },
    {
        "reporterId": "1",
        "projectId": "1",
        "sprintId": "7",
        "name": "Implement Data Manipulation Features",
        "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
        "timeEstimate": "6",
        "epic": "false"
    }
]

tasks_for_project2 = [
  {
    "reporterId": "2",
    "projectId": "2",
    "sprintId": "10",
    "name": "Prepare risk analysis",
    "description": "Implement a robust user authentication system to ensure secure access to the platform.\nUtilize industry-standard encryption algorithms and best practices.\nFor more information on user authentication, refer to [this Wikipedia article](https://en.wikipedia.org/wiki/Authentication).",
    "timeEstimate": "1",
    "epic": "true"
  },
  {
    "reporterId": "2",
    "projectId": "2",
    "sprintId": "10",
    "name": "Market research",
    "description": "Create an efficient and scalable database schema to store user data, application settings, and other relevant information.\nConsider the specific requirements of the project and choose appropriate data structures.\nLearn more about database design principles [here](https://en.wikipedia.org/wiki/Database_design).",
    "timeEstimate": "2",
    "epic": "true"
  },
  {
    "reporterId": "2",
    "projectId": "2",
    "sprintId": "10",
    "name": "Ads & social media launch",
    "description": "Develop the core features and functionality of the application according to the project requirements.\nFocus on essential tasks such as user registration, profile management, and data manipulation.\nLearn about software development methodologies [here](https://en.wikipedia.org/wiki/Software_development_process).",
    "timeEstimate": "1",
    "epic": "true"
  },
  {
    "reporterId": "2",
    "projectId": "2",
    "sprintId": "11",
    "name": "Implement Login Page UI",
    "description": "Design and implement the user interface for the login page of the application.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "29"
  },
  {
    "assigneeId": "1",
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "12",
    "name": "Develop Authentication API",
    "description": "Create API endpoints for user authentication, including login, registration, and password reset functionality.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "29"
  },
  {
    "assigneeId": "1",
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "12",
    "name": "Define Entity Relationships",
    "description": "Identify and define relationships between different entities in the database schema.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "30"
  },
  {
    "assigneeId": "1",
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "13",
    "name": "Create Table Definitions",
    "description": "Write SQL scripts to create tables and define their attributes based on the identified entity relationships.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "31"
  },
  {
    "assigneeId": "1",
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "13",
    "name": "User Registration",
    "description": "Implement user registration functionality, allowing new users to sign up for an account.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "29"
  },
  {
    "assigneeId": "1",
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "13",
    "name": "Profile Management",
    "description": "Develop user profile management features, allowing users to update their personal information and preferences.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "30"
  },
  {
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "14",
    "name": "Implement User Authentication",
    "description": "Develop the user authentication module to allow users to register, log in, and manage their accounts securely.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "31"
  },
  {
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "14",
    "name": "Design Database Schema",
    "description": "Create the database schema for the application, including tables, relationships, and constraints.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "31"
  },
  {
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "15",
    "name": "Implement User Profile Management",
    "description": "Develop the functionality to allow users to manage their profiles, including updating personal information and profile pictures.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "30"
  },
  {
    "reporterId": "1",
    "projectId": "2",
    "sprintId": "16",
    "name": "Implement Data Manipulation Features",
    "description": "Develop features for manipulating data within the application, such as creating, editing, and deleting records.",
    "timeEstimate": "1",
    "epic": "false",
    "inEpic": "29"
  }

]
# Combining all tasks and subtasks into a single list
all_tasks = tasks + base_tasks + subtasks_auth_system + subtasks_db_schema + subtasks_core_functionality + more_tasks + tasks_for_project2

task_comments = []

# Create users
jwts = []
for user_json in users:
    response = session.post(api + "/api/auth/register", json=user_json)
    jwts.append(response.json()['token'])
    print(f"User {user_json['firstName']} created with status code {response.status_code}")
    print(response.text)
# Print JWTs for created users
for i, jwt in enumerate(jwts):
    print(f"JWT for user {str(users[i])}: {jwt}")
projects = []
# create projects
for project_json in projects_to_make:
    response = session.post(api + "/api/project/createProject", json=project_json,
                            headers={'Authorization': 'Bearer ' + jwts[project_json['projectOwner']]})
    projects.append(response.json()['id'])
    print(f"User {project_json['name']} created with status code {response.status_code}")
    print(response.text)
# fill projects
for project_id in projects:
    for i in range(5):
        response = session.put(api + "/api/project/addUser",
                               json={
                                   "projectID": project_id,
                                   "userId": project_id * 5 - i
                               }, headers={'Authorization': 'Bearer ' + jwts[project_id * 5 - i - 1]})
        print(response.status_code)
        print(response.text)

response = session.put(api + "/api/project/addUser",
                       json={
                           "projectID": 2,
                           "userId": 1
                       }, headers={'Authorization': 'Bearer ' + jwts[0]})
# fill sprints
sprint_prefix = "Sprint"
start_date = datetime.datetime(2024, 4, 3, 12, 0, 0)
interval = datetime.timedelta(weeks=2)
no_sprints = 9
for project_id in projects:
    current_date = start_date
    for i in range(no_sprints):
        start_time = current_date.strftime("%Y-%m-%dT%H:%M:%SZ")
        stop_time = (current_date + interval).strftime("%Y-%m-%dT%H:%M:%SZ")
        current_date += interval
        sprint_data = {
            "sprintName": f"Sprint {i + 1}",
            "projectId": project_id,
            "startTime": start_time,
            "stopTime": stop_time
        }
        response = session.post(api + '/api/sprint/create', json=sprint_data,
                                headers={'Authorization': 'Bearer ' + jwts[project_id]})
        if response.status_code == 200:
            print(
                f"Sprint '{sprint_data['sprintName']}' created successfully for project '{projects_to_make[project_id - 1]['name']}'."
                f"With time duration: {start_time} till {stop_time}")
        else:
            print(f"Failed to create sprint for project '{projects_to_make[project_id - 1]['name']}'.")
# fill tasks
for task_json in all_tasks:
    response = session.post(api + '/api/task/create', json=task_json,
                            headers={'Authorization': 'Bearer ' + jwts[int(task_json['reporterId'])]})
    print(response.status_code, response.text)

print("\n", "#" * 40, "\n")
print("Edit tasks")
print("\n", "#" * 40, "\n")
# set tasks as done

for i, task_json in enumerate(all_tasks):
    if 'epic' in task_json and task_json['epic'] == 'false' and task_json and random.random() > 0.77:
        response = session.put(api + '/api/task/update',
                               json={
                                   "id": i + 1,
                                   "status": "closed"
                               },
                               headers={'Authorization': 'Bearer ' + jwts[int(task_json['reporterId'])]}
                               )
        print(response.status_code)
        print(f"updated task with id: {i + 1}")




print(f"Send all tasks: {len(all_tasks)}")
print(f"Example cookie: \n\t{jwts[0]}")
