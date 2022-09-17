import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Andaki' : 'Andaki'}</title>
        <meta name="description" content="Andaki Karts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-10 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Andaki</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
          <p>Copyright © 2022 Andaki Karts</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
