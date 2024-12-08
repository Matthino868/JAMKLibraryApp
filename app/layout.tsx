import './globals.css';
import { ReactNode } from 'react';
import Provider from '../context/Provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}

