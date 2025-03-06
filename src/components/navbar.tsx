"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCog,
  FaInfoCircle,
  FaBook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { name: "nav.home", href: "/", icon: FaHome },
  { name: "nav.about", href: "/about", icon: FaInfoCircle },
  { name: "nav.blog", href: "/blog", icon: FaBook },
  { name: "nav.settings", href: "/settings", icon: FaCog },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const intl = useIntl();

  // 检查是否在仪表盘页面
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">
                {intl.formatMessage({ id: "nav.appname" })}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center">
            {/* 如果在仪表盘页面，不显示主导航 */}
            {!isDashboard && (
              <ul className="flex space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={clsx(
                          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {intl.formatMessage({ id: item.name })}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <div
              className={clsx(
                "flex items-center space-x-2",
                !isDashboard && "ml-6"
              )}
            >
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {/* 如果在仪表盘页面，不显示汉堡菜单 */}
            {!isDashboard && (
              <button
                type="button"
                className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">
                  {intl.formatMessage({ id: "nav.menu" })}
                </span>
                {mobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {intl.formatMessage({ id: item.name })}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
