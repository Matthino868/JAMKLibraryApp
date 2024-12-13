'use client';

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react';
import Image from 'next/image';
import { FiLogOut, FiSearch, FiHome, FiMenu } from 'react-icons/fi';
import { MdDarkMode, } from 'react-icons/md';
import { Genre } from '../../components/Filters';
import Sidemenu from '../../components/Sidemenu';
import Button from '../../components/Button';


export default function Testpage() {
    const { data: session } = useSession();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    // const [genre, setGenre] = useState<string[]>([]);
    const [pages, setPages] = useState(0);
    const [description, setDescription] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const [bookId, setBookId] = useState("");

    // Handle add book
    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, pages, genre: selectedGenres, description }),
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
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
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
        <div>
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
                            onClick={() => window.location.href = '/homepage'}
                            className="border p-2 rounded-md hover:bg-white hover:text-[#0D004C] flex items-center justify-center"
                        >
                            <FiHome size={24} />
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
                <Sidemenu session={session} setIsMenuOpen={setIsMenuOpen}  >
                    <button
                        onClick={() => window.location.href = '/homepage'}
                        className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#0D004C] transition"
                    >
                        Homepage
                    </button>
                    {session.user.admin && (
                        <button
                            onClick={() => window.location.href = '/search'}
                            className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#0D004C] transition"
                        >
                            Search books
                        </button>
                    )}
                </Sidemenu>
            )}
            <div className="flex flex-col sm:flex-row ml-6 mr-6 gap-10">
                <div className='sm:w-1/2'>
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
                            <label className="block text-sm font-medium">Published Date:</label>
                            <input
                                type="date"
                                // value={publishedAt}
                                // onChange={(e) => setPublishedAt(e.target.value)}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Genre(s):</label>
                            <ul className="space-y-2 mt-2">
                                {Object.values(Genre).map((genre) => (
                                    <li key={genre} className="flex items-center space-x-2">
                                        <input type="checkbox" id={genre} name={genre} className="form-checkbox h-4 w-4 text-pink-500"
                                            checked={selectedGenres.includes(genre)}
                                            onChange={() => handleGenreChange(genre)} />
                                        <label htmlFor={genre} className="text-gray-600 capitalize">{genre}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button onClick={handleAddBook} text={"Add Book"} />
                    </form>
                </div>
                <div className='sm:w-1/2'>
                    <h3 className="text-xl font-semibold mt-8 mb-4">Delete a book</h3>
                    <div className='mb-4'>
                        <label className="block text-sm font-medium">Book ID:</label>
                        <input
                            type="text"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <Button onClick={handleDeleteBook} text={"Delete Book"} />
                </div>
            </div>
        </div>

    )
}

