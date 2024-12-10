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

interface FiltersProps {
    title: string;
    setTitle: (value: string) => void;
    author: string;
    setAuthor: (value: string) => void;
    minPages: number;
    setMinPages: (value: number) => void;
    maxPages: number;
    setMaxPages: (value: number) => void;
    selectedGenres: string[];
    handleGenreChange: (genre: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
    title,
    setTitle,
    author,
    setAuthor,
    minPages,
    setMinPages,
    maxPages,
    setMaxPages,
    selectedGenres,
    handleGenreChange,
}) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-md w-full overflow-y-auto">
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
                    <input className="w-[90%]" type="range" min="1" max="2000" value={minPages} onChange={(e) => setMinPages(Number(e.target.value))} />
                    <p>{minPages}</p>
                </div>
                <p>No. max pages:</p>
                <div className="flex items-center justify-between">
                    <input className="w-[90%]" type="range" min="1" max="2000" value={maxPages} onChange={(e) => setMaxPages(Number(e.target.value))} />
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
        </div>
    );
}

export default Filters;