export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">我们的使命</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          我们致力于创建高质量、用户友好的应用程序，帮助用户更轻松地完成他们的任务。
          我们相信技术应该为人类服务，而不是相反。
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          通过使用最新的技术和最佳实践，我们努力提供卓越的用户体验和高性能的应用程序。
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">我们的团队</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-2">张三</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">创始人 & CEO</p>
            <p className="text-gray-700 dark:text-gray-300">
              拥有10年的软件开发经验，专注于创建优秀的用户体验。
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-2">李四</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">CTO</p>
            <p className="text-gray-700 dark:text-gray-300">
              全栈开发者，热衷于探索新技术和解决复杂问题。
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-2">王五</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">设计师</p>
            <p className="text-gray-700 dark:text-gray-300">
              专注于用户界面和用户体验设计，创造美观且实用的界面。
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-2">赵六</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">市场总监</p>
            <p className="text-gray-700 dark:text-gray-300">
              负责产品推广和用户增长，擅长数字营销和用户获取。
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          如果您有任何问题或建议，请随时联系我们。我们很乐意听取您的意见！
        </p>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">邮箱：</span> contact@example.com
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">电话：</span> +86 123 4567 8910
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">地址：</span> 中国北京市朝阳区某某街道123号
          </p>
        </div>
      </div>
    </div>
  );
}
