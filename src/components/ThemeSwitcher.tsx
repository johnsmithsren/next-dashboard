"use client";

import { useState } from "react";
import { useTheme } from "@/theme/ThemeContext";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useIntl } from "react-intl";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // 获取当前主题图标
  const ThemeIcon =
    theme === "light" ? FaSun : theme === "dark" ? FaMoon : FaDesktop;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={intl.formatMessage({ id: "theme.toggle" })}
      >
        <ThemeIcon className="h-4 w-4" />
        <span className="sr-only md:not-sr-only">
          {intl.formatMessage({ id: `theme.${theme}` })}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                theme === "light"
                  ? "bg-gray-100 text-primary dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => changeTheme("light")}
              role="menuitem"
            >
              <FaSun className="h-4 w-4" />
              {intl.formatMessage({ id: "theme.light" })}
            </button>
            <button
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                theme === "dark"
                  ? "bg-gray-100 text-primary dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => changeTheme("dark")}
              role="menuitem"
            >
              <FaMoon className="h-4 w-4" />
              {intl.formatMessage({ id: "theme.dark" })}
            </button>
            <button
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                theme === "system"
                  ? "bg-gray-100 text-primary dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => changeTheme("system")}
              role="menuitem"
            >
              <FaDesktop className="h-4 w-4" />
              {intl.formatMessage({ id: "theme.system" })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
