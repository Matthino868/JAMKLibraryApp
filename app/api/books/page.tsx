// /app/page.tsx
import prisma from '@/lib/prisma';
import { BooksPageClient } from './BooksPageClient';

export default async function AppPage() {
  // Fetch books from the database on the server side
  const books = await prisma.book.findMany({
    where: { isAvailable: true },
  });

  // Pass the fetched books data to the client component
  return <BooksPageClient books={books} />;
}
