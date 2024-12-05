import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (

    <main>
        <h1>Welcome to the Library App</h1>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
    </main>

  )
}
