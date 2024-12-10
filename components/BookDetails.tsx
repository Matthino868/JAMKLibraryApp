import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";

const BookDetails = ({ book }) => {
  const { data: session } = useSession();
  if (!book) return null;

  const handleBook = async (userId) => {
    console.log("Borrowing book", book.title, book.id);
    console.log("userId", userId);
    const payload = { userId: userId !== null ? userId : null };
    console.log("payload", payload);
    await fetch(`/api/books?bookId=${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex gap-6">
      {/* Book Image */}
      <div className="w-1/3 flex-shrink-0">
        <Image className="w-auto h-auto" src={`https://placehold.co/640x960/lightgrey/black?text=${encodeURIComponent(book.title)}`} alt="Book cover" width={64} height={96} />
      </div>

      {/* Book Details */}
      <div className="flex-grow">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h2>

        {/* Author Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Author</h3>
          <p className="text-gray-600">{book.author}</p>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Description</h3>
          <p className="text-gray-600">{book.description}</p>
        </div>

        {/* Pages Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Number of Pages</h3>
          <p className="text-gray-600">{book.pages}</p>
        </div>

        {/* Genres Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Genres</h3>
          <p className="text-lg text-gray-600">
            {book.genre.map((genre, index) => (
              <span key={index}>
                {index > 0 ? ', ' : ''}{genre.charAt(0).toUpperCase() + genre.slice(1)}
              </span>
            ))}
          </p>
        </div>

        {/* ID Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">ID</h3>
          <p className="text-gray-600">{book.id}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          {book.userId === session.user.id ? (
            <Button text="Hand in Book" onClick={() => handleBook(null)} />
          ) : !book.userId ? (
            <Button text="Borrow Book" onClick={() => handleBook(session.user.id)} />
          ) : (
            <Button text="Reserve Book" onClick={() => handleBook(session.user.id)} />
          )}
        </div>
      </div>
    </div>



  );
};

export default BookDetails;
