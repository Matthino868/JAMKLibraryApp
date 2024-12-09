import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string;
            email?: string;
            image?: string;
            admin?: boolean;
        };
    }
    interface User {
        id: string;
        name?: string;
        email?: string;
        image?: string;
        admin?: boolean;
    }
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("credentials", credentials);
                // check if email and password are in credentials
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                // Check if user exists
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });
                if (!user) {
                    return null;
                }

                console.log("user", user);

                const passwordMatch = await bcrypt.compare(credentials.password as string, user.password);
                console.log("passwordMatch", passwordMatch);
                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id.toString(), // Convert number to string
                    name: user.name,
                    email: user.email,
                    admin: user.admin == true ? true : false
                };

            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;      // Add user ID
                token.name = user.name;  // Add user name
                token.email = user.email; // Add user email
                token.admin = user.admin; // Add user admin
            }
            return token;
        },
        async session({ session, token }) {
            // Make user ID, name, and email available in the session
            session.user.id = token.id as string;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.admin = token.admin as boolean;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 