// /app/BooksPageClient.tsx
'use client';  // Mark this file as a client component

import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BooksPageClientProps {
  books: Book[];
}

export function BooksPageClient({ books }: BooksPageClientProps) {
  // State for managing form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  // Handle form submission to add a new book
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, publishedAt }),
    });

    if (response.ok) {
      alert('Book added successfully!');
      setTitle('');
      setAuthor('');
      setPublishedAt('');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };

  return (
    <div>
      <h2>Available Books</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}

      <h3>Add a New Book</h3>
      <form onSubmit={handleAddBook}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Published Date:</label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
