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
                'block py-2 px-3 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700',
                {
                  'text-blue-600, dark:text-blue-600': pathname === link.href,
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