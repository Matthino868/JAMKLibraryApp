import React from 'react'

export default function Home() {
  return (
    <main className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">Welcome to the JAMK Library App</h1>
      
      {/* Project Overview Section */}
      <section>
        <h2 className="text-2xl font-semibold">Project Overview</h2>
        <p>
          The <strong>JAMK Library App</strong> is a full-stack application designed to manage a library system.
          Users can register, log in, search for books, borrow books, and reserve books. The app addresses the problem
          of efficiently managing library resources and user interactions.
        </p>

        <h3 className="text-xl mt-4">Key Links:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><a href="https://jamk-library-app-two.vercel.app/register" className="text-blue-500 hover:underline">Register Page</a></li>
          <li><a href="https://jamk-library-app-two.vercel.app/login" className="text-blue-500 hover:underline">Login Page</a></li>
          <li><a href="https://jamk-library-app-two.vercel.app/homepage" className="text-blue-500 hover:underline">Homepage</a></li>
        </ul>
      </section>

      {/* System Design Section */}
      <section>
        <h2 className="text-2xl font-semibold">System Design</h2>
        <h3 className="text-xl mt-4">Architecture</h3>
        <p>
          - <strong>Client:</strong> Built with Next.js and React. Handles the user interface and interactions.<br />
          - <strong>Server:</strong> Powered by Next.js, handling API requests and business logic.<br />
          - <strong>Database:</strong> PostgreSQL stores user and book information.<br />
          - <strong>Client-Server Interaction:</strong> RESTful API endpoints allow the client to communicate with the server, process requests, and send responses.<br />
          - <strong>Database Relations:</strong> Includes tables for User, Book, and Session.<br />
          - <strong>Hosting:</strong> Hosted on Vercel, ensuring scalable deployment for both the client and server components.
        </p>

        <h3 className="text-xl mt-4">Technologies and Frameworks</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Next.js</strong>: For server-side rendering and integration with React.</li>
          <li><strong>React</strong>: Used for the front-end interface due to its reusable, component-based architecture.</li>
          <li><strong>Tailwind CSS</strong>: Used for styling and creating responsive layouts.</li>
        </ul>

        <h3 className="text-xl mt-4">Key Features</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>User Authentication:</strong> Users can register, log in, and log out securely.</li>
          <li><strong>Book Management:</strong> Users can search for books, view details, borrow, and reserve them.</li>
          <li><strong>Responsive Design:</strong> Fully responsive, designed to work across all device sizes.</li>
          <li><strong>Admin Dashboard:</strong> Provides a dedicated dashboard for administrators to manage books and users.</li>
        </ul>
      </section>

      {/* Self-Assessment Section */}
      <section>
        <h2 className="text-2xl font-semibold">Self-Assessment</h2>
        <h3 className="text-xl mt-4">Time Spent</h3>
        <p>
          The reserved time for this work was 27 hours since I am working alone. However, I spent much more time than that on the project,
          given that it is a full-stack application. I have spent multiple 10+ hour days working on it, and I estimate I spent over 27 hours just on the frontend.
          While not every hour was spent on the frontend alone, I still dedicated a significant amount of time to it.
        </p>
      </section>

         </main>
  )
}
