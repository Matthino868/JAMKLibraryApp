// /app/page.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';

interface Book {
  id: number;
  title: string;
  author: string;
  userId: number;
  reserved: number[];
}

export default function HomePage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);


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

  // // Get all the borrowed books
  // console.log("books", books);
  // console.log("session", session);

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Access Denied: You must be signed in to view this page</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => window.location.href = '/login'}>Go to login page</button>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">Library App</h1>
        <h1 className='text-xl'>Welcome {session.user.name}</h1>
        <button
          onClick={() => window.location.href = '/search'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Search
        </button>
        <button
          onClick={async () => {
            const res = await signOut();
            console.log(res);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
        {books.filter((book) => book.userId === Number(session?.user?.id)).length > 0 ? (
          <ul className="space-y-2">
            {books
              .filter((book) => book.userId === Number(session?.user?.id))
              .map((book) => (
                <li key={book.id} className="p-4 border rounded shadow-sm" onClick={() => handleBookClick(book)}>
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No borrowed books.</p>
        )}

        <h2 className="text-2xl font-bold mb-4">Reserved Books</h2>
        {books.filter((book) => book.reserved?.includes(Number(session?.user?.id))).length > 0 ? (
          <ul className="space-y-2">
            {books
              .filter((book) => book.reserved?.includes(Number(session?.user?.id)))
              .map((book) => (
          <li key={book.id} className="p-4 border rounded shadow-sm" onClick={() => handleBookClick(book)}>
            <strong>{book.title}</strong> by {book.author}
          </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reserved books.</p>
        )}

        <h2 className="text-2xl font-bold mb-4">Available Books</h2>
        {books.length > 0 ? (
          <ul className="space-y-2">
            {books.map((book) => (
              <li key={book.id} className="p-4 border rounded shadow-sm" onClick={() => handleBookClick(book)}>
                <strong>{book.title}</strong> by {book.author}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No books available.</p>
        )}
        <Modal isOpen={!!selectedBook} onClose={closeModal}>
          {selectedBook && <BookDetails book={selectedBook} />}
        </Modal>

        <h3 className="text-xl font-semibold mt-8 mb-4">Add a New Book</h3>
        <form onSubmit={handleAddBook} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Published Date:</label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Genre:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Pages:</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>


      </div>
    </>
  );
}
