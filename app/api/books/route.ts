import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';

// GET: Fetch books from the database by Id or query
export async function GET(request: NextRequest) {

    // Check the session
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }
    
    console.log("GET route called")

    // Parse query parameters
    const url = new URL(request.url);
    const bookId = url.searchParams.get('bookId');
    const userId = url.searchParams.get('userId');

    // If an `id` is provided, fetch that specific book
    if (bookId) {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });

        if (book) {
            return NextResponse.json(book);
        } else {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }
    }

    // If a `userId` is provided, fetch books for that specific user
    if (userId) {
        const userBooks = await prisma.book.findMany({
            where: { userId: userId },
        });

        return NextResponse.json(userBooks);
    }

    // Search queries
    const title = url.searchParams.get('title') // Query param to filter title
    const author = url.searchParams.get('author') // Query param to filter author
    const genres = url.searchParams.get('genre')
    let genreList = []
    if (genres) {
        genreList = genres.split(',') // Query param to filter genres
    }  
    console.log("Genres", genres)
    const keyword = url.searchParams.get('keyword')
    const minPages = url.searchParams.get('minPages')
    const maxPages = url.searchParams.get('maxPages')

    // Apply the range filter: books with pages between minPages and maxPages
    const pagesFilter = {
        pages: {
            ...(minPages && { gte: Number(minPages) }), // Greater than or equal to minPages
            ...(maxPages && { lte: Number(maxPages) }), // Less than or equal to maxPages
        },
    };

    const books = await prisma.book.findMany({
        where: {
            AND: [
                // Match by keyword in title or author
                ...(keyword ? [{
                    OR: [
                        {
                            title: {
                                contains: keyword,
                                mode: 'insensitive' as const,
                            },
                        },
                        {
                            author: {
                                contains: keyword,
                                mode: 'insensitive' as const,
                            },
                        },
                    ],
                }] : []),

                // Match by title filter
                ...(title ? [{
                    title: {
                        contains: title,
                        mode: 'insensitive' as const,
                    },
                }] : []),

                // Match by author filter
                ...(author ? [{
                    author: {
                        contains: author,
                        mode: 'insensitive' as const,
                    },
                }] : []),

                // Match by genres
                ...(genres && genreList.length > 0 ? [{
                    genre: {
                        hasSome: genreList,
                    },
                }] : []),

                // Match by page filters
                ...(pagesFilter && Object.keys(pagesFilter).length > 0 ? [pagesFilter] : []),
            ].filter(Boolean), // Filter out any undefined or null values
        },
    });

    return NextResponse.json(books);
}

// POST: Create a new book
export async function POST(request: NextRequest) {
    console.log("POST route called")

    const session = await getServerSession(); // Get session from NextAuth
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Check if the user is logged in
    }

    const { title, author, genre, pages, description } = await request.json();
    
    if (!title || !author || !genre || !pages || !description) {
        return NextResponse.json({ error: 'Fields are missing' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            genre: genre,
            pages: pages,
            reserved: [],
            description: description,
        },
    });

    console.log("Book added successfully")
    console.log(newBook)
    return NextResponse.json(newBook);
}

// DELETE: Delete book by Id
export async function DELETE(request: NextRequest) {
    console.log("DELETE route called")

    const session = await getServerSession(); // Get session from NextAuth
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Check if the user is logged in
    }

    // Parse query parameters to get the book ID
    const url = new URL(request.url);
    const bookId = url.searchParams.get('bookId');

    // Check if the id parameter is provided
    if (!bookId) {
        return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    try {
        // Attempt to delete the book with the given ID
        const deletedBook = await prisma.book.delete({
            where: { id: bookId },
        });

        // Return success response if deletion is successful
        return NextResponse.json({ message: 'Book deleted successfully', deletedBook });
    } catch {
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }
}

// PUT: Update a book by Id
export async function PUT(request: NextRequest) {
    console.log("PUT route called")

    const session = await getServerSession(); // Get session from NextAuth
    console.log("session", session)
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Check if the user is logged in
    }

    // Parse query parameters to get the book ID
    const url = new URL(request.url);
    const bookId = url.searchParams.get('bookId');

    // Check if the id parameter is provided
    if (!bookId) {
        return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Check if book is already borrowed
    const book = await prisma.book.findUnique({
        where: { id: bookId },
    });
    if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const { title, author, publishedAt, genre, pages, userId } = await request.json();
    if (!title && !author && !publishedAt && !genre && !pages && !userId) {
        return NextResponse.json({ error: 'Fields are missing' }, { status: 400 });
    }

    try {
        const payload = {
            where: { id: bookId },
            data: {
                ...(title && { title }),
                ...(author && { author }),
                ...(publishedAt && { publishedAt: new Date(publishedAt) }),
                ...(genre && { genre: [genre] }),
                ...(pages && { pages }),
                ...(book.userId && userId !== null
                    ? {
                        reserved: { set: Array.from(new Set([...(book.reserved || []), userId])) }, // Ensure no duplicates
                    }
                    : { userId }),
            },
        }

        // Attempt to update the book with the given ID
        const updatedBook = await prisma.book.update(payload);

        // Return success response if update is successful
        return NextResponse.json({ message: 'Book updated successfully', updatedBook });
    } catch {
        return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
    }
}
