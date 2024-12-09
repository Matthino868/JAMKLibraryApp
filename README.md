# JAMK Library App
Arthur Struik - AG2730

2024/2025

Web Server programming with an application framework

TTC8430-3005

## Overview of the Project
The JAMK Library App is a full-stack application designed to manage a library system. The application allows users to register, log in, search for books, borrow books, and reserve books. The primary problem it solves is the efficient management of library resources and user interactions.

## System Design
### Architecture
The application follows a client-server architecture with the following components:

- __Client__: Built with Next.js and React, the client-side handles the user interface and interactions.
- __Server__: The server-side is powered by Next.js, handling API requests and business logic.
- __Database:__ PostgreSQL is used as the relational database to store user and book information.
- __Client-Server Interaction__: The client communicates with the server through RESTful API endpoints. The server processes the requests, interacts with the database, and sends responses back to the client.
- __Database Relations__: The database schema includes tables for User, Book, and Session. The User table stores user information, the Book table stores book details, and the Session table manages user sessions.

### Technologies and Frameworks
- __Next.js__: Chosen for its server-side rendering capabilities and seamless integration with React.
- __React:__ Used for building the user interface due to its component-based architecture and reusability.
- __PostgreSQL__: Chosen for its robustness, scalability, and support for complex queries.
- __Auth.js__: Utilized for handling user authentication, providing secure login and registration functionalities.

### API Endpoints
- __GET /api/books__: Fetches a list of books based on query parameters such as title, author, genre, and page range.
- __POST /api/books__: Creates a new book entry in the database.
- __PUT /api/books:__ Updates an existing book's details.
- __DELETE /api/books:__ Deletes a book by its ID.
- __POST /api/register:__ Registers a new user.

### Key Features
- __User Authentication:__ Users can register, log in, and log out securely.
- __Book Management:__ Users can search for books, view book details, borrow books, and reserve books.
- __Responsive Design:__ The application is designed to be responsive and accessible on various devices.
- __Admin Dashboard:__ Administrators can manage books and users through a dedicated dashboard.

## Areas of Improvement

### Real-Time Updates
- **Socket.io Integration**: Implement real-time updates using Socket.io to notify users about book availability, reservation status, and other database updates.

### Performance Optimization
- **Caching**: Implement caching strategies to reduce the load on the server and database, and to speed up response times for frequently accessed data.

### Additional Features
- **User Notifications**: Develop a notification system to alert users about due dates, overdue books, and other relevant information.
- **Advanced Search**: Enhance the search functionality to support more advanced queries, such as fuzzy search and sorting results.

### Testing and Quality Assurance
- **Automated Testing**: Increase the coverage of automated tests to ensure the reliability and stability of the application.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Set up a CI/CD pipeline to automate the testing and deployment process
