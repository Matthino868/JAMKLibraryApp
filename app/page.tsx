// /app/page.tsx
import prisma from '@/lib/prisma';
import { HomePageClient } from './HomePageClient';

export default async function HomePage() {
  // Fetch books from the database on the server
  const books = await prisma.book.findMany({
    where: { isAvailable: true },
  });

  // Pass the fetched books data as props to the client-side component
  return <HomePageClient books={books} />;
}
