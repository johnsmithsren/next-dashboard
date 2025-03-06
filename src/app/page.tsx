'use client';

import Link from "next/link";
import { useIntl } from "react-intl";

export default function Home() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        {intl.formatMessage({ id: "home.welcome" })}
      </h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        {intl.formatMessage({ id: "home.description" })}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{intl.formatMessage({ id: "home.features" })}</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>{intl.formatMessage({ id: "home.feature.responsive" })}</li>
            <li>{intl.formatMessage({ id: "home.feature.tailwind" })}</li>
            <li>{intl.formatMessage({ id: "home.feature.navigation" })}</li>
            <li>{intl.formatMessage({ id: "home.feature.darkmode" })}</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{intl.formatMessage({ id: "home.quicklinks" })}</h2>
          <div className="space-y-4">
            <Link
              href="/about"
              className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {intl.formatMessage({ id: "home.link.about" })}
            </Link>
            <Link
              href="/blog"
              className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {intl.formatMessage({ id: "home.link.blog" })}
            </Link>
            <Link
              href="/dashboard/documents"
              className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {intl.formatMessage({ id: "home.link.dashboard" })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
