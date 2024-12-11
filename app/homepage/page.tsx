// /app/page.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';
import { FiLogOut, FiMenu, FiSearch } from 'react-icons/fi';
import { MdDarkMode, } from 'react-icons/md';

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        {/* Access Denied Message */}
        <p className="text-lg font-medium text-gray-700 mb-4">Access Denied: You must be signed in to view this page</p>

        {/* Go to Login Button */}
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-white border border-pink-500 hover:text-pink-500 transition-colors duration-300"
          onClick={() => window.location.href = '/login'}
        >
          Go to login page
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0D004C] text-white p-4 flex justify-between items-center">
        {/* Left section */}
        <div className={`flex items-center justify-start flex-grow`}>
          <Image
            src="/images/logo1x.png"
            alt="Logo"
            className="w-20 h-12"
            width={764}
            height={462}
          />
        </div>

        {/* Buttons for larger screens */}
        <div className="hidden md:flex items-center justify-start gap-4">
          <h1 className="testclass">Welcome {session.user.name}</h1>
          {session.user.admin && (
            <button
              onClick={() => window.location.href = '/testpage'}
              className="bg-transparent border text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#0D004C]"
            >
              Admin Panel
            </button>
          )}
          <button
            onClick={() => window.location.href = '/search'}
            className="border p-2 rounded-md hover:bg-white hover:text-[#0D004C] flex items-center justify-center"
          >
            <FiSearch size={24} />
          </button>
          <button className="border p-2 rounded-md hover:bg-white hover:text-[#0D004C] flex items-center justify-center">
            <MdDarkMode size={24} />
          </button>
          <button
            onClick={async () => {
              const res = await signOut();
              console.log(res);
            }}
            className="bg-pink-500 text-white p-2 rounded-md hover:bg-white hover:text-pink-800 flex items-center justify-center"
          >
            <FiLogOut size={24} />
          </button>
        </div>

        {/* Hamburger menu for smaller screens */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <FiMenu size={32} />
          </button>
        </div>
      </div>

      {/* Side menu for mobile screens */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-[#0D004C] w-2/3 sm:w-1/3 h-full p-4 fixed right-0">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white absolute top-2 right-2 text-2xl"
            >
              &times;
            </button>

            {/* User Info */}
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <Image
                  src={`https://placehold.co/320x320/lightgrey/black?text=${encodeURIComponent(session.user.name)}`}
                  alt="Profile"
                  className="w-40 h-40 rounded-full"
                  width={96}
                  height={96}
                />
                <h1 className="text-white text-2xl mt-4">{session.user.name}</h1>
                <h2 className="text-gray-400 mb-4">{session.user.email}</h2>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col w-full gap-5">
                <hr className="border-t border-white w-full" />
                <button
                  onClick={() => window.location.href = '/search'}
                  className="bg-white text-[#0D004C] px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Search books
                </button>
                {session.user.admin && (
                  <button
                    onClick={() => window.location.href = '/testpage'}
                    className="bg-white text-[#0D004C] px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    Admin Panel
                  </button>
                )}
                <hr className="border-t border-white w-full" />
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center w-full mt-auto">
                <button className="text-white hover:text-gray-300">
                  <MdDarkMode size={32} />
                </button>
                <button
                  onClick={async () => {
                    const res = await signOut();
                    console.log(res);
                  }}
                  className="bg-pink-500 text-white p-2 rounded-md hover:bg-white hover:text-pink-800 flex items-center justify-center transition"
                >
                  <FiLogOut size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0D004C] border-opacity-75 mb-4"></div>

          {/* Loading Text */}
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      ) :
        (

          <div className="container mx-auto p-4">
            { /* Main content */}
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
        )}

    </>
  );
}
