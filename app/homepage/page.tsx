// /app/page.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';
import BookThumb from '../../components/BookThumb';
import Sidemenu from '../../components/Sidemenu';
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

  const [darkMode, setDarkMode] = useState(false)

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

  if (session === null) {
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
      <div className="bg-[#0D004C] sticky top-0 text-white p-4 flex justify-between items-center">
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
          <h1 className="testclass">Welcome {session?.user.name}</h1>
          {session?.user.admin && (
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
          <button className="border p-2 rounded-md hover:bg-white hover:text-[#0D004C] flex items-center justify-center"
            onClick={() => setDarkMode(!darkMode)}>
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
        <Sidemenu session={session} setIsMenuOpen={setIsMenuOpen}  >
          <button
            onClick={() => window.location.href = '/search'}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#0D004C] transition"
          >
            Search books
          </button>
          {session.user.admin && (
            <button
              onClick={() => window.location.href = '/testpage'}
              className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#0D004C] transition"
            >
              Admin Panel
            </button >
          )}
        </Sidemenu >
      )}

      {
        loading ? (
          <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? `bg-black` : `bg-white`}`}>
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0D004C] border-opacity-75 mb-4"></div>

            {/* Loading Text */}
            <p className={`text-lg font-medium ${darkMode ? `text-white` : `text-black`}`}>Loading...</p>
          </div>
        ) :
          (

            <div className={`flex flex-col px-5 gap-5 w-full ${darkMode ? `bg-black` : `bg-white`}`}>
              { /* Main content */}
              <div className=''>
                <h2 className={`text-2xl font-bold my-4 ${darkMode ? `text-white` : `text-black`}`}>Borrowed Books</h2>
                {books.filter((book) => book.userId === session?.user?.id).length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {books
                      .filter((book) => book.userId === session?.user?.id)
                      .map((book, index) => (
                        <div key={index}>
                          <BookThumb book={book} handleBookClick={handleBookClick} darkMode={darkMode} />
                        </div>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No borrowed books.</p>
                )}
              </div>
              <div className=''>
                <h2 className={`text-2xl font-bold my-4 ${darkMode ? `text-white` : `text-black`}`}>Reserved Books</h2>
                {books.filter((book) => book.reserved?.includes(session?.user?.id)).length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {books
                      .filter((book) => book.reserved?.includes(session?.user?.id))
                      .map((book, index) => (
                        <div key={index}>
                          <BookThumb book={book} handleBookClick={handleBookClick} darkMode={darkMode} />
                        </div>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No reserved books...</p>
                )}
              </div>
              <div className=''>
                <h2 className={`text-2xl font-bold my-4 ${darkMode ? `text-white` : `text-black`}`}>Available Books</h2>
                <div className="flex flex-col gap-2">
                  {books.map((book, index) => (
                    <div key={index}>
                      <BookThumb book={book} handleBookClick={handleBookClick} darkMode={darkMode}  />
                    </div>
                  ))}
                </div>
              </div>
              <Modal isOpen={!!selectedBook} onClose={closeModal}>
                {selectedBook && <BookDetails book={selectedBook} />}
              </Modal>
            </div>
          )
      }

    </>
  );
}
