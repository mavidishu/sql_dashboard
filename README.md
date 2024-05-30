# SQL Dashboard

## Overview

SQL Dashboard is a web application built using EJS, Express, Bootstrap and MySQL. This project aims to provide a user-friendly interface for managing and viewing SQL data. It leverages various npm packages such as faker, dotenv, mysql2, express, and nodemon.

## Features

- **User Management**: Add, view, update, and delete users.
- **Random User ID Generation**: Uses `faker` to generate unique user IDs.
- **RESTful APIs**: Utilizes RESTful APIs for CRUD operations.
- **Dynamic Views**: EJS templates for dynamic rendering of data.
- **Environment Configuration**: Uses `dotenv` for environment variable management.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Templating Engine**: EJS
- **Frontend** : Bootstrap
- **NPM Packages**:
  - `faker`: Generate random unique user IDs
  - `dotenv`: Manage environment variables
  - `mysql2`: MySQL database driver
  - `express`: To use express
  - `ejs`: To use ejs
  - `method-override`: To setup DELETE, PATCH and PUT request using html form
  - `nodemon`: Automatically restart the server on file changes

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sql-dashboard.git
   cd sql-dashboard
   ```
2. **Install MySQL**
   ```bash
   https://dev.mysql.com/downloads/installer/
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Start Server**
   ```bash
   nodemon index.js
   ```

## Warning
**Important** :Make sure to change MySQL credentials (host, root, and password) in index.js
