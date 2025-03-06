'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileAlt, FaUsers, FaChartBar, FaCog, FaHome } from 'react-icons/fa';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

const sidebarItems = [
  {
    name: 'dashboard.documents',
    href: '/dashboard/documents',
    icon: FaFileAlt,
  },
  {
    name: 'dashboard.users',
    href: '/dashboard/users',
    icon: FaUsers,
  },
  {
    name: 'dashboard.analytics',
    href: '/dashboard/analytics',
    icon: FaChartBar,
  },
  {
    name: 'dashboard.settings',
    href: '/dashboard/settings',
    icon: FaCog,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const intl = useIntl();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-md dark:bg-gray-900 pt-16 hidden md:block">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-5">
          <Link
            href="/"
            className="flex items-center p-2 rounded-lg text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
          >
            <FaHome className="w-6 h-6 transition duration-75" />
            <span className="ml-3">{intl.formatMessage({ id: 'nav.home' })}</span>
          </Link>
        </div>
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center p-2 rounded-lg text-base font-normal',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-6 h-6 transition duration-75" />
                  <span className="ml-3">{intl.formatMessage({ id: item.name })}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

// Mobile sidebar component
export function MobileSidebar() {
  const pathname = usePathname();
  const intl = useIntl();
  
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 md:hidden">
      <div className="grid h-full grid-cols-4 mx-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'inline-flex flex-col items-center justify-center px-5',
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{intl.formatMessage({ id: item.name })}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
