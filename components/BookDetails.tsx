import React from "react";
import { useSession } from "next-auth/react";

const BookDetails = ({ book }) => {
  const { data: session } = useSession();
  if (!book) return null;

  const handleBook = async (userId) => {
    console.log("Borrowing book", book.title, book.id);
    console.log("userId", userId);
    await fetch(`/api/books?bookId=${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId !== null ? Number(userId) : null }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  // console.log("book", book.userId);
  // console.log("session", session.user);
  return (
    <div>
      <h2 className=" text-gray-700 text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-700">Author: {book.author}</p>
      <p className="text-gray-600 mt-4">{book.description}</p>
      {book.userId === Number(session.user.id) ? (
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleBook(null)}>
          Hand in Book
        </button>
      ) : !book.userId ? (
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => handleBook(session.user.id)}>
          Borrow Book
        </button>
      ) : (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => handleBook(session.user.id)}>
          Reserve Book
        </button>
      )}
    </div>
  );
};

export default BookDetails;
