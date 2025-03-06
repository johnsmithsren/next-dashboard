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
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { useAuth } from "@/contexts/AuthContext";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();
  const { user, isAuthenticated, logout } = useAuth();

  // 检查是否在仪表盘页面
  const isDashboard = pathname?.startsWith("/dashboard");

  // 点击外部关闭用户菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              
              {/* 用户认证状态 */}
              {isAuthenticated ? (
                <div className="relative ml-3" ref={userMenuRef}>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <FaUser className="h-4 w-4" />
                    </div>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {intl.formatMessage({ id: "nav.dashboard" })}
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {intl.formatMessage({ id: "nav.settings" })}
                      </Link>
                      <button
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                      >
                        <div className="flex items-center">
                          <FaSignOutAlt className="mr-2 h-4 w-4" />
                          {intl.formatMessage({ id: "nav.signOut" })}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2 ml-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FaSignInAlt className="mr-1 h-4 w-4" />
                    {intl.formatMessage({ id: "nav.signIn" })}
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    <FaUserPlus className="mr-1 h-4 w-4" />
                    {intl.formatMessage({ id: "nav.signUp" })}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {/* 移动端用户菜单 */}
            {isAuthenticated ? (
              <div className="relative ml-3" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <FaUser className="h-4 w-4" />
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {intl.formatMessage({ id: "nav.dashboard" })}
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {intl.formatMessage({ id: "nav.settings" })}
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                        {intl.formatMessage({ id: "nav.signOut" })}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-1 ml-1">
                <Link
                  href="/login"
                  className="p-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <FaSignInAlt className="h-5 w-5" />
                </Link>
                <Link
                  href="/register"
                  className="p-1 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <FaUserPlus className="h-5 w-5" />
                </Link>
              </div>
            )}
            
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
