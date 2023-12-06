# Recipes Management - NestJS

The `Recipes Management` is a RESTful web-based API that allows users to create, manage, and share their favorite recipes. It provides endpoints for adding, editing, and searching for recipes, as well as user registration and authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

The Recipes Application includes the following features:

- User registration and authentication.
- Creation and management of recipes through RESTful endpoints, including name, category, description, ingredients, and directions.
- Search for recipes by name or category.
- Viewing, editing, and deleting individual recipes.

## Technologies Used

The project is built using the following technologies and frameworks:

- JavaScript
- TypeScrypt
- NestJS
- TypeORM
- SQLite (or your preferred database)

## Getting Started

To get started with the Recipes Application, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/sirio-roberto/recipes-management-nestjs.git
   ```

2. Set up your database. You can configure the database connection in the `app.module.ts` file.

3. Install the dependecies

   ```
   npm install
   ```

4. Run the application:
   `     npm start
    `
   The application will be accessible at `http://localhost:3000`.

## Usage

Interact with the Recipes Management by making HTTP requests to the provided API endpoints. You can use tools like Postman, curl, or any HTTP client to send requests to the API.

### User Registration

To register a new user, send a POST request to /register with the user's email address and password in the request body.

Example request body:

```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

### Recipe Management

Manage recipes using the following API endpoints:

- Create a recipe: Send a POST request to `/recipe/new` with the recipe details in the request body.
- View a recipe: Send a GET request to `/recipe/{id}` to retrieve a specific recipe by its ID.
- Edit a recipe: Send a PUT request to `/recipe/{id}` with updated recipe details in the request body.
- Delete a recipe: Send a DELETE request to `/recipe/{id}` to remove a recipe by its ID.

### Recipe Search

- Search by name: Send a GET request to `/recipe/search?name={name}` to find recipes by name.
- Search by category: Send a GET request to `/recipe/search?category={category}` to find recipes by category.

## Contributing

Contributions to the Recipes Application are welcome. You can contribute by:

- Reporting issues or suggesting improvements by creating GitHub issues.
- Submitting pull requests to address issues or implement new features.
