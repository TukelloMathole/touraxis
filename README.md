TourAxis Task Manager

TourAxis Task Manager is a simple task management application built with Node.js, Express.js, and Sequelize ORM. It allows users to create, update, and manage their tasks.
Features

    Create tasks
    Update task details
    Mark tasks as done
    View task details

Requirements

    Node.js
    npm (Node Package Manager)
    MySQL database

Installation

    Clone the repository:

    bash

git clone https://github.com/TukelloMathole/touraxis-task-manager.git

Navigate to the project directory:

bash

cd touraxis-task-manager

Install dependencies:

bash

npm install

Set up the database:

    Create a MySQL database named touraxis.
    Import the provided SQL file database.sql to create the necessary tables.

Configure the database connection:

    Open config/database.js file.
    Update the database configuration according to your MySQL setup.

Start the server:

bash

    npm start

    The application will be running at http://localhost:3000.

API Endpoints

    POST /api/users: Create a new user.
    PUT /api/users/
    : Update an existing user.
    GET /api/users: Get all users.
    GET /api/users/
    : Get user details by ID.
    POST /api/users/
    /tasks: Create a new task for a user.
    PUT /api/users/
    /tasks/
    : Update an existing task for a user.
    DELETE /api/users/
    /tasks/
    : Delete a task for a user.
    GET /api/users/
    /tasks: Get all tasks for a user.
    GET /api/users/
    /tasks/
    : Get task details by ID for a user.

Contributors

    John Doe (@john-doe)
    Jane Smith (@jane-smith)

License

This project is licensed under the MIT License - see the LICENSE file for details.
