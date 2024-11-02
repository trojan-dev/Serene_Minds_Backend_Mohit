# Serene Minds Backend 

This is the backend of Serene Minds, which features a Node.js-based Authentication API using the **pg** package to interact with **Supabase PostgreSQL**. The project includes user authentication (login) and demonstrates how to structure the codebase with **controllers** and **routes** in a minimal Express.js server.

## Features

- User login with email and password
- Direct interaction with Supabase PostgreSQL using the pg package
- Basic MVC structure (Controller + Routes)

## Project Structure

```
.
├── config
│   └── database.js          # PostgreSQL client configuration
├── controllers
│   └── userController.js    # Authentication logic
├── routes
│   └── userRoutes.js        # API routes for authentication
├── .env                      # Environment variables (not committed to version control)
├── app.js                   # Main entry point of the application
├── README.md                # This readme file
├── package.json             # Project dependencies
└── node_modules             # Installed dependencies
```

## Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** database hosted on Supabase

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   Make sure you're in the project directory and run:

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   In the root of the project, create a `.env` file with the following variables (adjust as needed):

   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[SUPABASE-HOST]:5432/postgres"
   PORT=3000
   ```

4. **Database Setup:**

   Ensure that your tables and schemas are created in Supabase. You can do this directly in the Supabase dashboard.

5. **Run the project:**

   Start the application using:

   ```bash
   npm start
   ```

6. **Test the API:**

   You can test the login endpoint using Postman or any API testing tool.

   - **POST** `/api/auth/login`

     Example request body:

     ```json
     {
       "email": "test@example.com",
       "password": "yourpassword"
     }
     ```

## Scripts

- `npm start` - Start the application in development mode.
- `npm run dev` - Start the application with live reload (if nodemon is installed).

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js
- [pg](https://node-postgres.com/) - PostgreSQL client for Node.js
- [Supabase](https://supabase.com/) - Open-source Firebase alternative with PostgreSQL

---

This revised README reflects your current setup with the `pg` package and the use of Supabase for managing your PostgreSQL database, along with the project structure and setup instructions. Let me know if you need any further modifications!