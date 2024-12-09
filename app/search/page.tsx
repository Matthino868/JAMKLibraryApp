'use client';

import { useState } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';
import Image from 'next/image';
import '../slider.css';

interface Book {
    id: number;
    title: string;
    author: string;
    userId: number;
    genre: string[];
}

enum Genre {
    Romance = 'romance',
    SciFi = 'sci-fi',
    Comedy = 'comedy',
    Thriller = 'thriller',
    Mystery = 'mystery',
    Fantasy = 'fantasy',
    Horror = 'horror',
    HistoricalFiction = 'historical fiction',
    NonFiction = 'non-fiction',
    Biography = 'biography',
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const [books, setBooks] = useState<Book[]>([]);
    const [minPages, setMinPages] = useState(0);
    const [maxPages, setMaxPages] = useState(2000);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleGenreChange = (genre: string) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
    };
    const handleSearch = async () => {
        console.log("genre", selectedGenres);
        const queryParams = new URLSearchParams({
            ...(query && { query }),
            ...(title && { title }),
            ...(author && { author }),
            ...(minPages && { minPages: minPages.toString() }),
            ...(maxPages && { maxPages: maxPages.toString() }),
            ...(selectedGenres.length && { genre: selectedGenres.join(',') }),
        }).toString();

        const fetchUrl = `/api/books?${queryParams}`;
        console.log('fetchUrl', fetchUrl);

        try {
            const response = await fetch(fetchUrl);
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

    const handleBookClick = (book) => {
        console.log("Selected book", book.genre);
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };

    return (
        <div>
            <div className='bg-purple-800 text-white p-4 flex justify-between items-center'>
                <div className="flex items-center justify-start">
                    <Image src="/images/logo1x.png" alt="Logo" className="w-20 h-12 mr-2" width={764} height={462} />
                    <button className="bg-transparent border text-white-800 px-4 py-2 rounded-md hover:bg-white hover:text-purple-800" onClick={() => window.location.href = '/homepage'}>Home</button>
                </div>
                <div className="flex items-center justify-end">
                    <input type="text" className="p-2 rounded-md text-black mr-4"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Titles, Authors, etc..."
                    />
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-pink-800" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="flex ml-6 mr-6">
                <div className="flex flex-col space-y-4 w-3/4">
                    {books.map((book, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white shadow-lg rounded-md">
                            <div className="flex items-center space-x-4">
                                <Image src={`https://placehold.co/64x96/lightgrey/black?text=${encodeURIComponent(book.title)}`} alt="Book cover" className="w-16 h-24 object-cover" width={64} height={96} />
                                <div>
                                    <h3 className="font-semibold text-gray-600">{book.title}</h3>
                                    <p className="text-sm text-gray-600">{book.author}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div>
                                    <p className="text-sm text-gray-600">{book.genre.map((genre, index) => (
                                        <>
                                            {index > 0 ? ', ' : ''}{genre.charAt(0).toUpperCase() + genre.slice(1)}
                                        </>
                                    ))}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Due date: 29 Sept. 2024</p>
                                    <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md" onClick={() => handleBookClick(book)}>View details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Modal isOpen={!!selectedBook} onClose={closeModal}>
                        {selectedBook && <BookDetails book={selectedBook} />}
                    </Modal>
                </div>
                <div className="w-1/4 ml-6">
                    <div className="p-4 bg-white shadow-lg rounded-md">
                        <h1 className="font-semibold text-gray-600 text-xl">Filters</h1>
                        <div>
                            <p>Search by Title</p>
                            <input
                                type="text"
                                className="p-2 rounded-md text-black w-full border border-grey-800"
                                placeholder="Enter book title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Search by Author</p>
                            <input
                                type="text"
                                className="p-2 rounded-md text-black w-full border border-grey-800"
                                placeholder="Enter author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="slidecontainer">
                            <p>No. min pages:</p>
                            <div className="flex items-center justify-between">
                                <input type="range" min="1" max="2000" value={minPages} onChange={(e) => setMinPages(Number(e.target.value))} />
                                <p>{minPages}</p>
                            </div>
                            <p>No. max pages:</p>
                            <div className="flex items-center justify-between">
                                <input type="range" min="1" max="2000" value={maxPages} onChange={(e) => setMaxPages(Number(e.target.value))} />
                                <p>{maxPages}</p>
                            </div>
                        </div>
                        <div>
                            <p>Genres:</p>
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
                        <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md" onClick={handleSearch}> Apply filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
