import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/index';
import Header from '../NavBar/index'

function Layout({ title, children }) {    
  
  return (
    <>
      <Head>
        <title>{title ? title + ' - Andaki' : 'Andaki'}</title>
        <meta name="description" content="Andaki Karts" />
        <link rel="icon" href="/LogoAndaki.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <Header />
        <main className="container mx-auto flex">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
