import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // return response.status(200).json({ NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET });
    return NextResponse.json({ NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET });
}