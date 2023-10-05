# ToDo Task Manager
Group project for CISC 594 class at HU (late summer 2023  semester);

# todo-task-manager-backend

Setting up local mongodb:
- Instructions are taken from https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/ but the main points are given below.
- Use brew to install
  ```
  brew tap mongodb/brew
  brew install mongodb-community
  brew install mongodb-community@7.0
  ```
- Start the db
  ```
  brew services start mongodb-community@7.0
  ```
- Use mongodb Compass for an easy to use GUI
- Setup a 'tasks' database as shown <img width="1422" alt="Screen Shot 2023-10-04 at 9 34 59 PM" src="https://github.com/arghp/tdl/assets/25332557/44ed1eac-a214-430e-94e7-f196d07dd8ce">

Starting up the backend:
- Node version used in development is lts/gallium -> v16.20.2
- Start with
  ```
  npm run start
  ```

