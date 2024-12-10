import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        console.log("request", request);
        const body = await request.json();
        const { name, email, password } = body.data;
        console.log("name, email, password", name, email, password);

        if(!name || !email || !password) {
            return NextResponse.json({ error: 'Missing name, email, password' }, { status: 400 });
        }
        console.log("test1");
        // Check if the user already exists
        const payload = { where: { email } };
        const existingUser = await prisma.user.findUnique(payload);
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }
        console.log("test2");

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ message: 'User registered successfully', user: newUser });
    } catch {
        // console.error('Registration error:', error);
        return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
    }
}
