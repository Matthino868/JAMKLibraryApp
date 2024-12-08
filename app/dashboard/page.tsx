'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
    const { data: session} = useSession();
    console.log("session", session);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hi {session?.user.email}</p>
        </div>
    )
}
