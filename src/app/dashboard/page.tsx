import Link from 'next/link';
import { FaFileAlt, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

const dashboardCards = [
  {
    title: '文档管理',
    description: '查看和管理您的所有文档',
    icon: FaFileAlt,
    href: '/dashboard/documents',
    color: 'bg-blue-500',
  },
  {
    title: '用户管理',
    description: '管理用户账户和权限',
    icon: FaUsers,
    href: '/dashboard/users',
    color: 'bg-green-500',
  },
  {
    title: '数据分析',
    description: '查看详细的数据分析和报告',
    icon: FaChartBar,
    href: '/dashboard/analytics',
    color: 'bg-purple-500',
  },
  {
    title: '系统设置',
    description: '配置系统参数和偏好设置',
    icon: FaCog,
    href: '/dashboard/settings',
    color: 'bg-orange-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="pb-16 md:pb-0">
      <h1 className="text-3xl font-bold mb-6">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <Icon className="text-white w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">快速统计</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">总文档数</p>
            <p className="text-2xl font-bold">128</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">活跃用户</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">本月新增</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">待处理任务</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
