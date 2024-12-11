import Image from 'next/image'

const BookThumb = ({ book, handleBookClick }) => {
    return (
        <div className="flex flex-row  items-center justify-between p-4 bg-white shadow-lg rounded-md hover:shadow-2xl hover:bg-gray-50 transition-shadow duration-300" onClick={() => handleBookClick(book)}>
            {/* Book Cover */}
            <Image
                src={`https://placehold.co/64x96/lightgrey/black?text=${encodeURIComponent(book.title)}`}
                alt="Book cover"
                className="w-24 h-32 object-cover flex-shrink-0"
                width={64}
                height={96}
            />
            <div className='flex flex-col sm:flex-row w-full '>
                <div className='flex flex-col'>
                    {/* Book Details */}
                    <div className="flex-1 px-4">
                        <h3 className="font-semibold text-gray-600">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                    <div className="hidden sm:block px-4 max-h-[5rem] overflow-hidden">
                        <p className="">{book.description}</p>
                    </div>
                </div>
                {/* Genre and Due Date */}
                <div className="flex px-4 flex-col items-start sm:items-end flex-shrink-0 sm:ml-auto">
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
        </div>


    )
}

export default BookThumb;