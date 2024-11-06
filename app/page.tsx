// /app/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState(0);

  const [publishedAt, setPublishedAt] = useState('');

  // Fetch books from the API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  // Handle add book
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, publishedAt, pages, genre }),
    });

    if (response.ok) {
      const newBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setTitle('');
      setAuthor('');
      setPublishedAt('');
      alert('Book added successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
