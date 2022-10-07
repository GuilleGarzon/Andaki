import Image from 'next/image';
import { Menu } from '@headlessui/react';
import DropdownLink from '../DropdownLink';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState, useContext } from 'react';
import { Store } from '../../store/index';
import Cookies from 'js-cookie';

function Header() {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <header>
      <nav className="flex h-24 items-center px-4 justify-between shadow-md sm:px-12 bg-gray-800">
        {session?.user ? (
          <Link href="/listProducts">
            <a className="flex justify-center items-center">
              <Image
                src="/LogoAndaki.png"
                alt="Logo Andaki Karts"
                width={60}
                height={60}
                className="rounded-full"
              />
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a className="flex justify-center items-center">
              <Image
                src="/LogoAndaki.png"
                alt="Logo Andaki Karts"
                width={60}
                height={60}
                className="rounded-full"
              />
            </a>
          </Link>
        )}       

        <div className="flex justify-center text-center">
          <Link href="/cart">
            <a className="py-3 text-white font-bold hover:text-gray-200 transition duration-500 ease-in-out sm:mr-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="sm:w-6 sm:h-6 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {cartItemsCount > 0 && (
                <span className="rounded-full justify-center absolute -mt-10 bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>

          {status === 'loading' ? null : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-white font-bold p-3 hover:text-gray-200">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Perfil
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin ? (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/listProducts"
                    >
                      Lista de Productos
                    </DropdownLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/order-history"
                    >
                      Historial de Ordenes
                    </DropdownLink>
                  </Menu.Item>
                )}

                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/orders"
                    >
                      Tablero Admin
                    </DropdownLink>
                  </Menu.Item>
                )}

                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="/"
                    onClick={logoutClickHandler}
                  >
                    Cerrar Sesión
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <Link href="/login">
                <a className="btn-login-navBar">Iniciar Sesión</a>
              </Link>
              <Link href="/register">
                <a className="btn-register-navBar">Registrate</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
