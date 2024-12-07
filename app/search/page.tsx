'use client';

import { useState } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    userId: number;
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/books?keyword=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            console.log(data);
            setBooks(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="bg-purple-900 text-white p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img src="/path/to/logo.png" alt="Logo" className="w-10 h-10 mr-2"></img>
                    <span className="font-bold text-2xl">Library</span>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-transparent border text-white px-4 py-2 rounded" onClick={() => window.location.href = '/homepage'}>Home</button>
                    <button className="bg-transparent border text-white px-4 py-2 rounded">My Loans</button>
                    <button className="bg-transparent border text-white px-4 py-2 rounded">Reservations</button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <input type="text" className="p-2 w-1/2 rounded-md text-black"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Titles, Authors, etc..."
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md" onClick={handleSearch}>Search</button>
            </div>
            <div className="w-3/4 ml-6">
                <div className="flex flex-col space-y-4">
                    {books.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-md">
                            <div className="flex items-center space-x-4">
                                <img src="https://via.placeholder.com/64x96" alt="Book cover" className="w-16 h-24 object-cover" />
                                <div>
                                    <h3 className="font-semibold text-gray-600">{result.title}</h3>
                                    <p className="text-sm text-gray-600">{result.author}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-600">Comedy, Thriller</p>
                                <p className="text-xs text-gray-500">Due date: 29 Sept. 2024</p>
                                <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md">View details</button>
                            </div>
                        </div>
                    ))}
                    {/* <div className="flex items-center justify-between p-4 bg-white shadow rounded-md">
                        <div className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/64x96" alt="Book cover" className="w-16 h-24 object-cover" />
                            <div>
                                <h3 className="font-semibold text-gray-600">Turks fruit</h3>
                                <p className="text-sm text-gray-600">Author: Bookname</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-600">Comedy, Thriller</p>
                            <p className="text-xs text-gray-500">Due date: 29 Sept. 2024</p>
                            <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md">View details</button>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
}
