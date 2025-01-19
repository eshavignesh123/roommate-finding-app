'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Matching', href: '/dashboard' },
    { name: 'Your Chats', href: '/dashboard/your-chats' },
    { name: 'Your Matches', href: '/dashboard/your-matches' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
                {
                  'dark:text-blue-600': pathname === link.href,
                },
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
    </ul>
    </div>
);
}