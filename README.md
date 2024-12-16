# JAMK Library App
Arthur Struik - AG2730

2024/2025

Web Visualization

TTC8410-3005

Link to externally hosted website
https://jamk-library-app-two.vercel.app/login

Admin account: arthur@gmail.com
password: arthur

Test account: test@gmail.com
password: arthur

## Overview of the Project
The JAMK Library App is a full-stack application designed to manage a library system. The application allows users to register, log in, search for books, borrow books, and reserve books. The primary problem it solves is the efficient management of library resources and user interactions.

Register page
https://jamk-library-app-two.vercel.app/register

Login
https://jamk-library-app-two.vercel.app/login

Homepage
https://jamk-library-app-two.vercel.app/homepage

## Technologies and Frameworks

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
- __Tailwind__: Used to style the interface components

### Key Features
- __User Authentication:__ Users can register, log in, and log out securely.
- __Book Management:__ Users can search for books, view book details, borrow books, and reserve books.
- __Responsive Design:__ The application is designed to be responsive and accessible on various devices.
- __Admin Dashboard:__ Administrators can manage books and users through a dedicated dashboard.

# Self Assesment
## Time spent
The reserverd work was a total of 27 hours because I am working alone. I spent way more than 27 hours on this project because I am doing a full stack project. I have spent multiple 10+ hour days on this project. Ofcourse not every hour has gone into the front end but I still easily spent more than 27 hours on the frontend.
