# Cinema Management System - API Documentation

## 📌 Project Overview

This is a server-side application developed using **Node.js**, **Express**, and **MongoDB (Mongoose)**. The project implements a full RESTful API for managing a cinema's operations, including movies, halls, screenings, users, and reservations.

A key feature of this project is the **centralized exception handling mechanism**, which ensures that all errors (validation, not found, duplicates, or server errors) return a uniform JSON response.

---

## 🏗️ Project Structure

The project follows a **Controller-Service-Model** architectural pattern to separate concerns:

- **`models/`**: Defines the data structure (Schema) for each entity using Mongoose. It includes constraints like `required`, `unique`, `min` values, and custom validators.
- **`services/`**: Contains the core business logic. Services interact with the database and perform validations. They are responsible for throwing custom exceptions when business rules are violated.
- **`controllers/`**: Handle incoming HTTP requests. They extract parameters, call the appropriate service method, and return the HTTP response. They are kept "thin" to avoid logic duplication.
- **`routes/`**: Defines the API endpoints and maps them to specific controller functions.
- **`utils/exceptions.js`**: Contains the custom exception classes used throughout the app.
- **`server.js`**: The entry point of the application. It configures middleware, routes, and the **Global Error Handler**.

---

## 🛠️ Centralized Exception Handling

### Custom Exceptions

We implemented a hierarchy of exceptions to categorize errors:

1. **`ResourceNotFoundException` (404)**: Thrown when a requested ID does not exist in the database.
2. **`DuplicateResourceException` (409)**: Thrown when a unique constraint is violated (e.g., duplicate email or overlapping screening).
3. **`InvalidDataException` (400)**: Thrown when provided data is logically incorrect (e.g., invalid seat format).

### The Global Error Handler

Instead of handling errors in every controller, all errors are passed to a central middleware in `server.js`. This handler:

- **Translates Mongoose `CastError`** $\rightarrow$ `400 Bad Request` (for malformed ObjectIds).
- **Translates Mongoose `ValidationError`** $\rightarrow$ `400 Bad Request` (for missing fields or range errors).
- **Translates Custom Exceptions** $\rightarrow$ Respective status codes.
- **Handles Internal Errors** $\rightarrow$ `500 Internal Server Error`.

**Uniform Error Response Format:**
\`\`\`json
{
"status": 404,
"error": "Client Error",
"message": "Rezervarea nu a fost gasita",
"timestamp": "2026-09-30T..."
}
\`\`\`

---

## 🚀 RESTful API Endpoints

**Base URL:** `http://localhost:3000/api`

### 🎬 Filme (Movies)

| Method      | Endpoint     | Description             |
| :---------- | :----------- | :---------------------- |
| `GET`       | `/filme`     | List all movies         |
| `GET`       | `/filme/:id` | Get movie details by ID |
| `POST`      | `/filme`     | Add a new movie         |
| `PUT/PATCH` | `/filme/:id` | Update movie details    |
| `DELETE`    | `/filme/:id` | Remove a movie          |

### 🏢 Sali (Halls)

| Method      | Endpoint    | Description            |
| :---------- | :---------- | :--------------------- |
| `GET`       | `/sale`     | List all halls         |
| `GET`       | `/sale/:id` | Get hall details       |
| `POST`      | `/sale`     | Create a new hall      |
| `PUT/PATCH` | `/sale/:id` | Update hall dimensions |
| `DELETE`    | `/sale/:id` | Remove a hall          |

### 📅 Proiectii (Screenings)

| Method      | Endpoint         | Description                               |
| :---------- | :--------------- | :---------------------------------------- |
| `GET`       | `/proiectii`     | List all screenings                       |
| `GET`       | `/proiectii/:id` | Get screening details                     |
| `POST`      | `/proiectii`     | Create a screening (checks for conflicts) |
| `PUT/PATCH` | `/proiectii/:id` | Update screening details                  |
| `DELETE`    | `/proiectii/:id` | Remove a screening                        |

### 👤 Utilizatori (Users)

| Method      | Endpoint           | Description                                   |
| :---------- | :----------------- | :-------------------------------------------- |
| `GET`       | `/utilizatori`     | List all users                                |
| `GET`       | `/utilizatori/:id` | Get user profile                              |
| `POST`      | `/utilizatori`     | Register a new user (checks for unique email) |
| `PUT/PATCH` | `/utilizatori/:id` | Update user info                              |
| `DELETE`    | `/utilizatori/:id` | Delete a user                                 |

### 🎟️ Rezervari (Reservations)

| Method      | Endpoint         | Description                                               |
| :---------- | :--------------- | :-------------------------------------------------------- |
| `GET`       | `/rezervari`     | List all reservations                                     |
| `GET`       | `/rezervari/:id` | Get reservation details                                   |
| `POST`      | `/rezervari`     | Book seats (validates user, projection, and availability) |
| `PUT/PATCH` | `/rezervari/:id` | Modify reservation seats                                  |
| `DELETE`    | `/rezervari/:id` | Cancel reservation                                        |
