"use client";

import { FaSave, FaUser } from "react-icons/fa";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto pb-16 md:pb-0">
      <h1 className="text-3xl font-bold mb-6">设置</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-primary text-primary whitespace-nowrap">
              个人资料
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 whitespace-nowrap">
              账户安全
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 whitespace-nowrap">
              通知设置
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 whitespace-nowrap">
              外观设置
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-2xl">
                <FaUser className="w-8 h-8" />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">个人资料照片</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                点击编辑按钮更改您的个人资料照片
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  姓氏
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue="张"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  名字
                </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue="三"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                电子邮箱
              </label>
              <input
                type="email"
                id="email"
                defaultValue="zhangsan@example.com"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                手机号码
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue="13800138000"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                个人简介
              </label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="我是一名软件开发者，热爱编程和新技术。"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>保存更改</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
