// /app/api/books/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch books from the database by Id or query
export async function GET(request: Request) {
    // Parse query parameters
    const url = new URL(request.url);
    const bookId = url.searchParams.get('bookId');
    const userId = url.searchParams.get('userId');

    // If an `id` is provided, fetch that specific book
    if (bookId) {
        const book = await prisma.book.findUnique({
            where: { id: Number(bookId) },
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
            where: { userId: Number(userId) },
        });

        return NextResponse.json(userBooks);
    }

    // Search queries
    const title = url.searchParams.get('title') // Query param to filter title
    const author = url.searchParams.get('author') // Query param to filter author
    const genres = url.searchParams.getAll('genre')
    const pages = url.searchParams.get('pages')

    // Prepare filter for pages (if range is provided)
    let pagesFilter = {};
    if (pages) {
        const [minPages, maxPages] = pages.split(',').map(Number)

        // Ensure that minPages and maxPages are valid numbers
        if (isNaN(minPages) || isNaN(maxPages)) {
            return NextResponse.json({ error: 'Invalid page range' }, { status: 400 });
        }

        // Apply the range filter: books with pages between minPages and maxPages
        pagesFilter = {
            pages: {
                gte: minPages, // Greater than or equal to minPages
                lte: maxPages, // Less than or equal to maxPages
            },
        };
    }

    const books = await prisma.book.findMany({
        where: {
            ...(title && {
                title: {
                    contains: title, // Match titles containing the filter value
                    mode: 'insensitive', // Make the search case-insensitive
                },
            }),
            ...(author && {
                author: {
                    contains: author, // Match authors containing the filter value
                    mode: 'insensitive', // Make the search case-insensitive
                },
            }),
            ...(genres.length > 0 && {
                genre: {
                    hasSome: genres, // Match books with any of the genres provided
                },
            }),
            ...(Object.keys(pagesFilter).length > 0 && pagesFilter),
        },
    });

    return NextResponse.json(books);
}

// POST: Create a new book
export async function POST(request: Request) {
    const { title, author, publishedAt, genre, pages } = await request.json();

    if (!title || !author || !genre || !pages) {
        return NextResponse.json({ error: 'Fields are missing' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            publishedAt: publishedAt ? new Date(publishedAt) : null,
            isAvailable: true,
            genre: [genre],
            pages: pages,
            reserved: []
        },
    });
    console.log("Book added succesfully")
    console.log(newBook)
    return NextResponse.json(newBook);
}

// DELETE: Delete book by Id
export async function DELETE(request: Request) {
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
            where: { id: Number(bookId) },
        });

        // Return success response if deletion is successful
        return NextResponse.json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }
}


