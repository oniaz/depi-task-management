# Task Management System API

**Deployment**: [https://depi-task-management-api-simplified.vercel.app/](https://depi-task-management-api-simplified.vercel.app/)


# Table of Contents
1. [Installation, Configuration, and Usage](#installation-configuration-and-usage)
   - [Prerequisites](#prerequisites)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Running the Server](#running-the-server)
2. [API Documentation](#api-documentation)
   - [User Management Endpoints](#user-management-endpoints)
     - [POST /api/user/register](#post-apiuserregister)
     - [POST /api/user/login](#post-apiuserlogin)
     - [DELETE /api/user](#delete-apiuser)
   - [Task Management Endpoints](#task-management-endpoints)
     - [GET /api/tasks](#get-apitasks)
     - [POST /api/tasks](#post-apitasks)
     - [GET /api/tasks/:id](#get-apitasksid)
     - [DELETE /api/tasks/:id](#delete-apitasksid)
     - [PUT /api/tasks/:id](#put-apitasksid)
     - [PATCH /api/tasks/:id](#patch-apitasksid)

## Installation, Configuration, and Usage

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js. [Learn more about npm](https://www.npmjs.com/get-npm)

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/oniaz/depi-task-management.git
```

### Installation

Once you have cloned the repository, navigate to the project directory and install the required dependencies:

```bash
cd depi-task-management/api-simplified
npm install
```

### Configuration
Create a `.env` file in the `depi-task-management/api-simplified` directory and include the following environment variables:

```env
# Server configuration
PORT=your-port-number

# Database connection
MONGO_URI=your-mongodb-uri

# JWT configuration
JWT_SECRET=your-jwt-secret

# Admin credentials
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
```
Make sure to replace placeholders (`your-port-number`, `your-mongodb-uri`, `your-jwt-secret`, `your-admin-email`, and `your-admin-password`) with your actual values.

### Running the Server
To start the server, run the following command:

```bash
npm start
```
The server should now be running, and you can access the API at `http://localhost:<PORT>`.


## API Documentation

### User Management Endpoints

#### POST /api/user/register

##### Endpoint
`https://depi-task-management-api-simplified.vercel.app/api/user/register`

##### Description
Registers a new user in the system.

##### Request Body
The following fields should be passed in the request body as JSON:

```json
{
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "password": "SecurePass123"
}
```

| Field      | Type   | Description                         | Required |
|------------|--------|-------------------------------------|----------|
| `name`     | String | User's full name                    | Yes      |
| `email`    | String | User's unique email address         | Yes      |
| `password` | String | User's password                     | Yes      |

##### Response
- **201 Created**
  - User registration was successful.
  - Example:
    ```json
    {
        "message": "User created successfully"
    }
    ```
- **400 Bad Request**
  - Missing required fields (`name`, `email`, or `password`), or the user already exists.
  - Example:
    ```json
    {
        "message": "Missing required fields: name, email, or password"
    }
    ```
  - Example:
    ```json
    {
        "message": "User already exists"
    }
    ```
- **500 Internal Server Error**
  - An error occurred on the server.
  - Example:
    ```json
    {
        "message": "Error message here"
    }
    ```


#### POST /api/user/login

##### Endpoint
`https://depi-task-management-api-simplified.vercel.app/api/user/login`

##### Description
Logs in an existing user by validating their credentials.

##### Request Body
The following fields should be passed in the request body as JSON:

```json
{
    "email": "alice.johnson@example.com",
    "password": "SecurePass123"
}
```

| Field      | Type   | Description                         | Required |
|------------|--------|-------------------------------------|----------|
| `email`    | String | User's email address                | Yes      |
| `password` | String | User's password                     | Yes      |

##### Response
- **200 OK**
  - User login was successful.
  - Example:
    ```json
    {
        "message": "Login successful",
        "jwtToken": "your_jwt_token_here",
        "user": "Alice Johnson"
    }
    ```
- **400 Bad Request**
  - Missing required fields (`email` or `password`).
  - Example:
    ```json
    {
        "message": "Missing required fields: email or password"
    }
    ```
- **404 Not Found**
  - User with the given email does not exist.
  - Example:
    ```json
    {
        "message": "User not found"
    }
    ```
- **401 Unauthorized**
  - Incorrect password.
  - Example:
    ```json
    {
        "message": "Invalid credentials"
    }
    ```
- **500 Internal Server Error**
  - An error occurred on the server.
  - Example:
    ```json
    {
        "message": "Error message here"
    }
    ```

##### Notes
- A JWT token is returned upon successful login, which should be included in subsequent requests for endpoints that require authentication.

Here’s the documentation for the `DELETE /` endpoint:



#### DELETE /api/user

##### Endpoint
`https://depi-task-management-api-simplified.vercel.app/api/user`

##### Description
Deletes the authenticated user's account and all tasks associated with it.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```


##### Response
- **200 OK**
  - User and their associated tasks were successfully deleted.
  - Example:
    ```json
    {
        "message": "User and associated tasks deleted successfully"
    }
    ```
- **500 Internal Server Error**
  - An error occurred on the server.
  - Example:
    ```json
    {
        "message": "Error message here"
    }
    ```

### Task Management Endpoints

#### GET /api/tasks

##### Endpoint
`https://depi-task-management-api-simplified.vercel.app/api/tasks`

##### Description
Retrieves all tasks created by the authenticated user.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### Response
- **200 OK**
  - Tasks retrieved successfully.
  - Example:
    ```json
    {
        "message": "Tasks retrieved successfully",
        "tasks": [
            {
                "id": "64a7b2e84f4d2b8a9f7e1d23",
                "title": "Complete project documentation",
                "status": "in-progress",
                "priority": "high",
                "category": "Work",
                "createdBy": {
                    "id": "64a7b2e84f4d2b8a9f7e1d22",
                    "name": "Alice Johnson"
                }
            },
            {
                "id": "64a7b2e84f4d2b8a9f7e1d24",
                "title": "Buy groceries",
                "status": "done",
                "priority": "medium",
                "category": "Personal",
                "createdBy": {
                    "id": "64a7b2e84f4d2b8a9f7e1d22",
                    "name": "Alice Johnson"
                }
            }
        ]
    }
    ```
- **500 Internal Server Error**
  - An error occurred on the server.
  - Example:
    ```json
    {
        "message": "Error message here"
    }
    ```

##### Notes
- The tasks are returned in an array, each containing details such as `id`, `title`, `status`, `priority`, `category`, and the `createdBy` user with their `id` and `name`.
- The tasks are filtered based on the `userID` extracted from the JWT token.




#### POST /api/tasks
Creates a new task.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### Request Body
The request body must be in JSON format and include the following fields:

- **title**: The title of the task (required) - string.
- **priority**: The priority of the task (optional, default is 'medium') - string; possible values are `low`, `medium`, `high`.
- **category**: The category of the task (required) - string.

###### Example Request Body
```json
{
    "title": "DEPI final project",
    "priority": "medium",
    "category": "A simple task that I can finish quickly."
}
```

##### Responses
- **201 Created**: Task created successfully.
    ```json
    {
        "message": "Task created successfully",
        "task": {
            "id": "task_id_here",
            "title": "DEPI final project",
            "status": "todo",
            "priority": "medium",
            "category": "A simple task that I can finish quickly.",
            "createdBy": {
                "id": "user_id_here",
                "name": "User Name"
            }
        }
    }
    ```

- **400 Bad Request**: Missing required fields or invalid priority.
    ```json
    {
        "message": "Missing required fields: title or category"
    }
    ```

- **500 Internal Server Error**: Server error message.
    ```json
    {
        "message": "Error message here"
    }
    ```



#### GET /api/tasks/:id
Retrieves a specific task by its ID.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### URL Parameters
- **id**: The ID of the task to retrieve.

###### Example Request
```
GET https://depi-task-management-api-simplified.vercel.app/api/tasks/6713c79902cf27cdda386372
```

##### Responses
- **200 OK**: Task retrieved successfully.
    ```json
    {
        "message": "Task retrieved successfully",
        "task": {
            "id": "6713c79902cf27cdda386372",
            "title": "Sample Task Title",
            "status": "todo",
            "priority": "medium",
            "category": "Sample Category",
            "createdBy": {
                "id": "user_id_here",
                "name": "User Name"
            }
        }
    }
    ```

- **400 Bad Request**: Invalid format for task ID.
    ```json
    {
        "message": "Invalid format for task ID"
    }
    ```

- **404 Not Found**: Task not found.
    ```json
    {
        "message": "Task not found"
    }
    ```

- **500 Internal Server Error**: Server error message.
    ```json
    {
        "message": "Error message here"
    }
    ```



#### DELETE /api/tasks/:id
Deletes a specific task by its ID.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### URL Parameters
- **id**: The ID of the task to delete.

###### Example Request
```
DELETE https://depi-task-management-api-simplified.vercel.app/api/tasks/6713c9ad02cf27cdda386395
```

##### Responses
- **200 OK**: Task deleted successfully.
    ```json
    {
        "message": "Task deleted successfully"
    }
    ```

- **400 Bad Request**: Invalid format for task ID.
    ```json
    {
        "message": "Invalid format for task ID"
    }
    ```

- **404 Not Found**: Task not found.
    ```json
    {
        "message": "Task not found"
    }
    ```

- **500 Internal Server Error**: Server error message.
    ```json
    {
        "message": "Error message here"
    }
    ```



#### PUT /api/tasks/:id
Updates a specific task by its ID.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### URL Parameters
- **id**: The ID of the task to update.

##### Request Body
- **title**: The title of the task (optional).
- **status**: The status of the task (optional, must be one of: `todo`, `in-progress`, `done`).
- **priority**: The priority of the task (optional, must be one of: `low`, `medium`, `high`).
- **category**: The category of the task (optional).

###### Example Request
```
PUT https://depi-task-management-api-simplified.vercel.app/api/tasks/6713c79902cf27cdda386372
```

###### Body
```json
{
    "title": "DEPI final project: task management system",
    "category": "Final Project",
    "priority": "high"
}
```

##### Responses
- **200 OK**: Task updated successfully.
    ```json
    {
        "message": "Task updated successfully",
        "task": {
            "id": "6713c79902cf27cdda386372",
            "title": "DEPI final project: task management system",
            "status": "todo",
            "priority": "high",
            "category": "Final Project",
            "createdBy": {
                "id": "670d82a993d59dafa98532b6",
                "name": "User Name"
            }
        }
    }
    ```

- **400 Bad Request**: Invalid status or priority, or missing required fields.
    ```json
    {
        "message": "Invalid status"
    }
    ```

- **404 Not Found**: Task not found.
    ```json
    {
        "message": "Task not found"
    }
    ```

- **500 Internal Server Error**: Server error message.
    ```json
    {
        "message": "Error message here"
    }
    ```


#### PATCH /api/tasks/:id
Updates the status of a specific task by its ID.

##### Authentication
- This endpoint requires a valid JWT token in the `Authorization` header as `Bearer <token>`.

- Example header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```

##### URL Parameters
- **id**: The ID of the task to update (required).

##### Request Body
- **newStatus**: The new status of the task (required, must be one of: `todo`, `in-progress`, `done`).

###### Example Request
```
PATCH https://depi-task-management-api-simplified.vercel.app/api/tasks/6713ce5eeeb11f14db25a128
```

###### Body
```json
{
    "newStatus": "in-progress"
}
```

##### Responses
- **200 OK**: Task status updated successfully.
    ```json
    {
        "message": "Task status updated successfully",
        "task": {
            "id": "6713ce5eeeb11f14db25a128",
            "title": "Task Title",
            "status": "in-progress",
            "priority": "medium",
            "category": "Task Category",
            "createdBy": {
                "id": "670d82a993d59dafa98532b6",
                "name": "User Name"
            }
        }
    }
    ```

- **400 Bad Request**: Missing `newStatus`, invalid status, or invalid task ID format.
    ```json
    {
        "message": "Missing required fields: newStatus"
    }
    ```

- **404 Not Found**: Task not found.
    ```json
    {
        "message": "Task not found"
    }
    ```

- **500 Internal Server Error**: Server error message.
    ```json
    {
        "message": "Error message here"
    }
    ```
