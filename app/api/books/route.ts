// /app/api/books/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { title, author, publishedAt } = await request.json();

  if (!title || !author) {
    return NextResponse.json({ error: 'Title and author are required' }, { status: 400 });
  }

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      isAvailable: true,
    },
  });
  console.log("asdf1")

  return NextResponse.json(newBook);
}
