#  CHMIEL

This is Jira inspired project for managing Scrum projects. It gives you option for splitting work between projects. Each project have an owner which can add/remove members.
Projects have sprints, where each sprint can have multiple tasks. Additionally there's a backlog for each project which helps hold issues/tasks not assigned to any sprint yet.


## Table of Contents

- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Disclaimer](#disclaimer)
- [License](#license)


## Technologies

[![](https://github.com/Experrior/CHMIEL/assets/73387931/ce324f52-5e64-44b6-a5f4-00264f6136bd) **Spring Boot**](https://spring.io/projects/spring-boot)
to create the backend server

[![](https://github.com/Experrior/CHMIEL/assets/73387931/520bd416-7c6a-490b-8a8d-eadb2804c3ac) **React.js**](https://react.dev/)
for frontend, website interface

[![](https://github.com/Experrior/CHMIEL/assets/73387931/f496b663-e3e5-4367-a21a-bb51e16a2883) **Docker**](https://www.docker.com/)
as a contenerization tool

[![](https://github.com/Experrior/CHMIEL/assets/73387931/e0b0f258-ca0e-42ae-896e-321afc3ad70b) **PostgreSQL**](https://www.postgresql.org/)
for Relational Datbase Managment system

[![](https://github.com/user-attachments/assets/4b7aed33-ead9-4b4d-a0c3-64c84fb2b0bf) **Groovy**](https://groovy-lang.org/)
for testing using Spock framework


## Screenshots

### Login Page

![login_page](https://github.com/user-attachments/assets/8f894510-0130-437b-bbfd-6063f4e87533)

### Home Page

![Screenshot_20240718_222425](https://github.com/user-attachments/assets/223c6c30-6702-43f5-af9a-85524a9d70f9)

### Issues Page

![Screenshot_20240718_222514](https://github.com/user-attachments/assets/fdfe5908-2eb5-41a8-8585-a6fbf991e2c2)

### Graphs

![Screenshot_20240718_232905](https://github.com/user-attachments/assets/937b3beb-bed4-473f-8b1c-78d6a273f999)

### User Page

![Screenshot_20240718_222425](https://github.com/user-attachments/assets/df1b127a-33f0-4ab5-aa77-69acadc6828b)


## Setup

#### For windows:

  ```
  docker compose -f compose.yaml build
  docker compose -f compose.yaml up -d --remove-orphans
  ```

#### For Linux:

  You can run the same commands as above or just run 'startup.sh' script
  
  ``` 
  chmod +x startup.sh; ./startup.sh 1
  ```
  
  which will create build and and start docker compose and additionally will leave you real-time overview for 'docker ps' command.

### Prerequisites

Make sure you have the following software installed:

[![](https://github.com/Experrior/CHMIEL/assets/73387931/f496b663-e3e5-4367-a21a-bb51e16a2883) **Docker**](https://www.docker.com/)


## Disclaimer

This is not the complete project, but contains a lot of usefull features and solution which could help with inspiring and helping with your own projects.


## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


