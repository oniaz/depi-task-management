# Task Management System API

**Deployment**: [https://depi-task-management-server.vercel.app/](https://depi-task-management-server.vercel.app/)

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
cd depi-task-management/api
npm install
```

### Configuration
Create a `.env` file in the `depi-task-management/api` directory and include the following environment variables:

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

### Authentication Routes

- **POST** `/api/auth/register`  
  Registers a new user. By default, the role is set to **employee**.  
  **Body Parameters**:  
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **POST** `/api/auth/login`  
  Logs in a user and returns a JWT token along with the user's name.
  **Body Parameters**:  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Admin Routes

- **GET** `/api/admin/users`  
  Retrieves a list of all users.  

- **PATCH** `/api/admin/users/:id`  
  Updates a user's role by ID.  
  **Body Parameters**:  
  ```json
  {
    "newRole": "string"
  }
  ```

- **DELETE** `/api/admin/users/:id`  
  Deletes a user by ID.  

### Manager Routes

- **GET** `/api/manager/tasks`  
  Retrieves a list of all tasks.  

- **POST** `/api/manager/tasks`  
  Creates a new task. The status is set to complete by default, and the priority is optional, defaulting to medium.  
  **Body Parameters**:  
  ```json
  {
    "title": "string",
    "description": "string",
    "assignedTo": "string",
    "dueDate": "string (valid date format)",
    "priority": "string (optional)",
    "category": "string"
  }
  ```  
  **Note**: The `dueDate` should be in one of the following valid date formats:  
  - ISO 8601: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`
  - RFC 2822: `Tue, 15 Oct 2024 14:30:00 GMT`
  - Unix Timestamp: `1697371800000`

- **GET** `/api/manager/tasks/:id`  
  Retrieves a specific task by ID.  

- **PUT** `/api/manager/tasks/:id`  
  Updates a specific task by ID. Any of the following fields can be provided; not all of them are required.  
  **Body Parameters** (any of the following):  
  ```json
  {
    "title": "string",
    "description": "string",
    "assignedTo": "string",
    "status": "string",
    "dueDate": "string (valid date format)",
    "priority": "string",
    "category": "string"
  }
  ```  
  **Note**: The `dueDate` should follow the same valid date formats as above.

- **DELETE** `/api/manager/tasks/:id`  
  Deletes a specific task by ID.  

### Employee Routes

- **GET** `/api/employee/tasks`  
  Retrieves a list of all tasks assigned to the employee.  

- **GET** `/api/employee/tasks/:id`  
  Retrieves a specific task assigned to the employee by ID.  

- **PATCH** `/api/employee/tasks/:id`  
  Updates the status of a specific task by ID.  
  **Body Parameters**:  
  ```json
  {
    "newStatus": "string"
  }
  ```

### Note
- For all routes requiring authentication, include the JWT token in the request headers as `Authorization: Bearer <token>`.
- Replace `:id` in the routes with the appropriate resource ID.
