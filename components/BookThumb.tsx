import Image from 'next/image'

const BookThumb = ({ book, handleBookClick }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-md">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Image src={`https://placehold.co/64x96/lightgrey/black?text=${encodeURIComponent(book.title)}`} alt="Book cover" className="w-24 h-32 object-cover" width={64} height={96} />
                <div>
                    <h3 className="font-semibold text-gray-600">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <div className='flex '>
                    <p className="text-sm text-gray-600">
                        {book.genre.map((genre, index) => (
                            <span key={index}>
                                {index > 0 ? ', ' : ''}{genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </span>
                        ))}
                    </p>
                    <p className="text-xs text-gray-500">Due date: 29 Sept. 2024</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div>
                    <button className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md w-full sm:w-auto" onClick={() => handleBookClick(book)}>View details</button>
                </div>
            </div>
        </div>

    )
}

export default BookThumb;