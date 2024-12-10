// /app/page.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';

interface Book {
  id: string;
  title: string;
  author: string;
  userId: string;
  reserved: string[];
}

export default function HomePage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Loading...</p>
      </div>
    )
  }
  console.log("session", session)
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
      <div className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <div className='flex items-center justify-start'>
          <Image src="/images/logo1x.png" alt="Logo" className="w-20 h-12 mr-2" width={764} height={462} />
          <button
            onClick={() => window.location.href = '/search'}
            className="bg-transparent border text-white-800 px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-800"
          >
            Search books
          </button>
          {session.user.admin === true ? (
            <button
              onClick={() => window.location.href = '/testpage'}
              className="bg-transparent border text-white-800 px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-800"
            >
              Admin Panel
            </button>
          ) : null}
        </div>
        <h1 className='text-xl'>Welcome {session.user.name}</h1>

        <button
          onClick={async () => {
            const res = await signOut();
            console.log(res);
          }}
          className="bg-pink-500 text-white px-4 py-2 rounded-md  hover:bg-white hover:text-pink-800"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
        {books.filter((book) => book.userId === session?.user?.id).length > 0 ? (
          <ul className="space-y-2">
            {books
              .filter((book) => book.userId === session?.user?.id)
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
        {books.filter((book) => book.reserved?.includes(session?.user?.id)).length > 0 ? (
          <ul className="space-y-2">
            {books
              .filter((book) => book.reserved?.includes(session?.user?.id))
              .map((book) => (
                <li key={book.id} className="p-4 border rounded shadow-sm" onClick={() => handleBookClick(book)}>
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reserved books...</p>
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
      </div>
    </>
  );
}
