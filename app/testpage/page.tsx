'use client';

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react';
import Image from 'next/image';

export default function Testpage() {
    const { data: session } = useSession();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [pages, setPages] = useState(0);
    const [description, setDescription] = useState('');

    const [bookId, setBookId] = useState("");


    // Handle add book
    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, pages, genre, description }),
        });

        if (response.ok) {
            const newBook = await response.json();
            // setBooks((prevBooks) => [...prevBooks, newBook]);
            setTitle('');
            setAuthor('');
            // setPublishedAt('');
            alert(`Book added successfully with ID:${newBook.id}`);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    };

    const handleDeleteBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/books?bookId=${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert(`Book deleted successfully with name:${result.deletedBook.title}`);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    }

    const handleGenreChange = (genre: string) => {
        setGenre((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
    };

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-lg mb-4">Access Denied: You must be signed in to view this page</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => window.location.href = '/login'}>Go to login page</button>
            </div>
        );
    }
    return (
        <div>
            <div className=" bg-purple-800 text-white p-4 flex justify-between items-center">
                <div className='flex items-center justify-start'>
                    <Image src="/images/logo1x.png" alt="Logo" className="w-20 h-12 mr-2" width={764} height={462} />
                    <button
                        onClick={() => window.location.href = '/homepage'}
                        className="bg-transparent border text-white-800 px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-800"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => window.location.href = '/search'}
                        className="bg-transparent border text-white-800 px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-800"
                    >
                        Search books
                    </button>
                </div>
                <h1 className='text-xl'>Welcome {session?.user.name}</h1>
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
            <div className="flex ml-6 mr-6 gap-10">
                <div className='w-2/4'>
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
                            <label className="block text-sm font-medium">Number of Pages:</label>
                            <input
                                type="number"
                                value={pages}
                                onChange={(e) => setPages(Number(e.target.value))}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Genre(s):</label>
                            <ul className="mt-1 p-2 border rounded w-full">
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="romance"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Romance
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="sci-fi"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        SciFi
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="comedy"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Comedy
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="thriller"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Thriller
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="mystery"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Mystery
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="fantasy"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Fantasy
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="horror"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Horror
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="historical fiction"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Historical Fiction
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="non-fiction"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Non-Fiction
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="biography"
                                            onChange={(e) => handleGenreChange(e.target.value)}
                                        />
                                        Biography
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Book
                        </button>
                    </form>
                </div>
                <div className='w-1/2'>
                    <h3 className="text-xl font-semibold mt-8 mb-4">Delete a book</h3>
                    <div>
                        <label className="block text-sm font-medium">Book ID:</label>
                        <input
                            type="text"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleDeleteBook}
                    >
                        Delete Book
                    </button>
                </div>
            </div>
        </div>

    )
}

