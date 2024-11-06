import './globals.css'; 
import { ReactNode } from 'react';

export const metadata = {
  title: 'Library App',
  description: 'A simple app for managing books',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header>
          <h1>Welcome to the Library App</h1>
        </header>
        <main>
          {children} 
        </main>
      </body>
    </html>
  );
}
