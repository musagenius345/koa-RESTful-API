# Koa RESTful API

This API provides basic CRUD functionality for managing todos. Built using Koa.js and Better-SQLite3, it demonstrates the implementation of a RESTful API with various endpoints for creating, reading, updating, and deleting todos.

## Tech Stack

- **Koa.js:** A modern, lightweight, and expressive web framework for Node.js.
- **Better-SQLite3:** A fast and simple SQLite database library for Node.js.
- **Jest:** A delightful JavaScript testing framework for unit testing(WIP).
- **Supertest:** A SuperAgent driven library for testing HTTP servers(WIP).

## What I've Learned

Throughout this project, I've learned and implemented:

- **Koa.js Fundamentals:** Explored the core concepts of Koa.js, including middleware, context, and routing, to create a robust API.
- **Database Interaction:** Implemented CRUD operations using Better-SQLite3, ensuring secure and efficient data management.
- **RESTful API Design:** Designed RESTful endpoints following best practices for creating, reading, updating, and deleting resources.
- **Testing with Jest:** Utilized Jest and Supertest for writing extensive unit tests to validate API functionality and handle edge cases.
- **Error Handling:** Implemented error handling mechanisms to ensure graceful handling of various error scenarios(WIP).
- **HTTP Methods and Status Codes:** Understood the significance of different HTTP methods (GET, POST, PUT, DELETE) and corresponding status codes in API development.

## How It Works

1. **Initialization:**
   - The API initializes a SQLite database with a 'todos' table for storing todo items.
   - The server starts on port 3000.

2. **Endpoints:**
   - **GET `/todos`:** Retrieves a list of todos.
   - **POST `/todos`:** Creates a new todo item.
   - **PUT `/todos/:id`:** Updates an existing todo item by ID.
   - **DELETE `/todos/:id`:** Deletes a todo item by ID.

3. **Testing:**
   - Unit tests for the API are written using Jest and Supertest to ensure each endpoint's functionality and handle various scenarios.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/musagenius3455/koa-RESTful-API.git
   cd koa-RESTful-API
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the API:**
   ```bash
   npm start
   ```

4. **Run Tests:**
   ```bash
   npm test
   ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## License

This project is licensed under the [MIT License](LICENSE).


