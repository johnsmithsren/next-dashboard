import Link from 'next/link';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: '开始使用 Next.js',
    excerpt: '本文将介绍如何开始使用 Next.js 构建现代化的 Web 应用程序。',
    date: '2025-03-01',
    readTime: '5 分钟',
    category: '教程',
  },
  {
    id: 2,
    title: 'Tailwind CSS 的优势',
    excerpt: '探索使用 Tailwind CSS 进行快速 UI 开发的优势和最佳实践。',
    date: '2025-02-25',
    readTime: '7 分钟',
    category: '设计',
  },
  {
    id: 3,
    title: '响应式设计技巧',
    excerpt: '学习如何创建在各种设备上都能完美展示的响应式网站。',
    date: '2025-02-20',
    readTime: '6 分钟',
    category: '设计',
  },
  {
    id: 4,
    title: 'React 性能优化',
    excerpt: '深入了解 React 应用程序的性能优化技术和策略。',
    date: '2025-02-15',
    readTime: '10 分钟',
    category: '开发',
  },
  {
    id: 5,
    title: '现代 JavaScript 特性',
    excerpt: '探索 ES6+ 中的现代 JavaScript 特性，提高你的编码效率。',
    date: '2025-02-10',
    readTime: '8 分钟',
    category: '开发',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">博客文章</h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {post.date}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold mb-2 hover:text-primary">
              <Link href={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                阅读时间: {post.readTime}
              </span>
              <Link
                href={`/blog/${post.id}`}
                className="text-primary hover:underline font-medium"
              >
                阅读更多 &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
