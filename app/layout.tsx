import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | UsedFul',
    default: 'UsedFul',
  },
  description: 'NextJS side project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-neutral-900 text-white max-w-sm mx-auto w-[calc(100vh_-_3.5rem)]`}
      >
        {children}
      </body>
    </html>
  );
}
