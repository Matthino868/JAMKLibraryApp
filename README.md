# JAMK Library App
Arthur Struik - AG2730

2024/2025

Web Server programming with an application framework

TTC8430-3005

Link to externally hosted website
https://jamk-library-o611bk2lp-arthurstruiks-projects.vercel.app/
Admin account: arthur@gmail.com
password: arthur

Test account: test@gmail.com
password: arthur

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
- __Hosting__: The application is hosted on Vercel, providing seamless deployment and scalability for the web server and client-side components.

### Technologies and Frameworks
- __Next.js__: Chosen for its server-side rendering capabilities and seamless integration with React.
- __React:__ Used for building the user interface due to its component-based architecture and reusability.
- __PostgreSQL__: Chosen for its robustness, scalability, and support for complex queries.
- __Auth.js__: Utilized for handling user authentication, providing secure login and registration functionalities.
- __Vercel__: Used for hosting the application, providing seamless deployment and scalability for both the web server and client-side components.

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

# Self Assesment
## Time spent
The reserverd work was a total of 40 hours because I am working alone. I spent way more than 40 hours on this project because I am doing a full stack project. I have spent multiple 10+ hour days on this project. Ofcourse not every hour has gone into the back end but I still easily spent more than 40 hours on the backend.

## Own assesment
Going into this project I knew it would be a difficult project. I didn't have any prior knowledge about any of the aspect of this project so everything that had to be done has been learned during my time Finland. React, Nextjs, AuthJs, tailwindCSS, PostgreSQL are all frameworks I have never used before. I had some pretty tough challenges along the way, most notably the authentication is something I spent multiple days on without progress. Looking back I feel like I only touched the surface of what this project could have been. Everytime I finished a feature I thought of 2 other features which are crucial for a library website. I tried to finish as many features while also finishing the core features of a library website.

I didn't get to write automated tests for all my code which is something I wanted to practice. It felt like I was never at a point where I had a clear structure that could be tested routinely. In addition, I also wanted to add real-time notifications for when books were due to be returned. This was a feature that was at the end of my todo-list which I should have given more priority because it was a feature that wasn't in the course material. In the end I think I build a MVP that showcases the most import features of a library website.

In conclusion, I have learned so much, not only during the exercises, but especially during the project. The project gave me hands-on experience as to what it is like to be a full stack developer and which challenges this brings. I have learned from every aspect of this project, from building with a framework like react to smaller stuff like user authentication with AuthJS. This is maybe not the most advanced backend ever but I think I added another dimension of difficulty that is just as valuable to learn.
