'use client';

import { useState } from 'react';
import Modal from '../../components/Modal';
import BookDetails from '../../components/BookDetails';
import Filters from '../../components/Filters';
import Image from 'next/image';
import '../slider.css';
import { FiHome, FiSearch, FiFilter } from 'react-icons/fi';
import { CgClose } from "react-icons/cg";
import BookThumb from '@/components/BookThumb';
interface Book {
    id: number;
    title: string;
    author: string;
    userId: number;
    genre: string[];
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

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleGenreChange = (genre: string) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
    };
    const handleSearch = async () => {
        const queryParams = new URLSearchParams({
            ...(query && { keyword: query }),
            ...(title && { title }),
            ...(author && { author }),
            ...(minPages && { minPages: minPages.toString() }),
            ...(maxPages < 2000 && { maxPages: maxPages.toString() }),
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
            <div className='bg-[#0D004C] sticky top-0 text-white p-4 flex justify-between items-center'>
                {/* Left Section */}
                <div className="flex items-center justify-start gap-2">
                    {/* Hide logo on small screens */}
                    <Image
                        src="/images/logo1x.png"
                        alt="Library logo"
                        className="hidden sm:block w-20 h-12 mr-2"
                        width={764}
                        height={462}
                    />
                    <button
                        className="bg-transparent border text-white-800 p-2 rounded-md hover:bg-white hover:text-[#0D004C]"
                        onClick={() => window.location.href = '/homepage'}
                    >
                        <FiHome size={24} />
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-end ">
                    <input
                        type="text"
                        className="p-2 rounded-md text-black mr-4 "
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Titles, Authors, etc..."
                    />
                    <button
                        className="bg-pink-500 text-white p-2 rounded-md hover:bg-white hover:text-pink-800"
                        onClick={handleSearch}
                    >
                        <FiSearch size={24} />
                    </button>
                </div>
            </div>

            <div className="flex ml-6 mr-6 overflow-y-auto">
                <div className="flex flex-col space-y- w-full md:w-3/4 gap-2">
                    {books.map((book, index) => (
                        <div key={index}>
                            <BookThumb book={book} handleBookClick={handleBookClick} darkMode={false}/>
                        </div>
                    ))}
                    <Modal isOpen={!!selectedBook} onClose={closeModal}>
                        {selectedBook && <BookDetails book={selectedBook} />}
                    </Modal>
                </div>
                <div className="w-1/4 ml-6 hidden md:block">
                    <Filters
                        title={title}
                        setTitle={setTitle}
                        author={author}
                        setAuthor={setAuthor}
                        minPages={minPages}
                        setMinPages={setMinPages}
                        maxPages={maxPages}
                        setMaxPages={setMaxPages}
                        selectedGenres={selectedGenres}
                        handleGenreChange={handleGenreChange}
                    />
                </div>
            </div>
            {/* Floating Action Button */}
            <button
                className="md:hidden fixed bottom-4 right-4 bg-[#0D004C] text-white p-3 rounded-md shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <FiFilter size={24} />
            </button>

            {/* Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={()=>setIsFilterOpen(false)}>
                    <div className="flex flex-col items-end bg-[#0D004C] w-2/3 sm:w-2/3 h-full p-4 fixed right-0"
                    onClick={(e)=>e.stopPropagation()}>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-white text-2xl justify-center items-center flex p-2 mb-2 rounded-md hover:bg-pink-600"
                        >
                            <CgClose size={24} />
                        </button>
                        <Filters
                            title={title}
                            setTitle={setTitle}
                            author={author}
                            setAuthor={setAuthor}
                            minPages={minPages}
                            setMinPages={setMinPages}
                            maxPages={maxPages}
                            setMaxPages={setMaxPages}
                            selectedGenres={selectedGenres}
                            handleGenreChange={handleGenreChange}
                        />
                        <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md" onClick={handleSearch}> Apply filters</button>
                    </div>
                </div>
            )}
        </div>
    );
}
