'use client';

import { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaSort, FaEllipsisV, FaCheck, FaTimes } from 'react-icons/fa';
import { userAPI, User } from '@/services/api';
import { usePaginatedApi } from '@/hooks/useApi';
import { useIntl } from 'react-intl';

export default function UsersPage() {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // 使用我们的自定义钩子获取用户数据
  const {
    data: users,
    total,
    page,
    limit,
    loading,
    error,
    changePage,
    changeLimit,
    refresh
  } = usePaginatedApi<User>(
    async (page, limit) => {
      // 构建查询参数
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString()
      };
      
      if (searchTerm) params.search = searchTerm;
      if (roleFilter) params.role = roleFilter;
      if (statusFilter) params.status = statusFilter;
      
      try {
        // 调用 API 获取用户数据
        return await userAPI.getUsers(params);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        // 返回一个空的分页响应
        return { data: [], total: 0, page, limit };
      }
    },
    1, // 初始页码
    10, // 每页数量
    searchTerm,
    roleFilter,
    statusFilter
  );
  
  // 当筛选条件变化时刷新数据
  useEffect(() => {
    refresh();
  }, [searchTerm, roleFilter, statusFilter, refresh]);
  
  // 处理用户状态变更
  const handleToggleUserStatus = async (userId: string | number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === '活跃' ? '已禁用' : '活跃';
      await userAPI.updateUser(userId, { status: newStatus });
      refresh(); // 刷新用户列表
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };
  
  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">{intl.formatMessage({ id: 'dashboard.users' })}</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <FaUserPlus className="w-4 h-4" />
          <span>{intl.formatMessage({ id: 'users.addUser' })}</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'users.searchPlaceholder' })}
              className="w-full p-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <select 
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">{intl.formatMessage({ id: 'users.allRoles' })}</option>
              <option value="管理员">{intl.formatMessage({ id: 'users.admin' })}</option>
              <option value="编辑">{intl.formatMessage({ id: 'users.editor' })}</option>
              <option value="用户">{intl.formatMessage({ id: 'users.user' })}</option>
            </select>
            <select 
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">{intl.formatMessage({ id: 'users.allStatuses' })}</option>
              <option value="活跃">{intl.formatMessage({ id: 'users.active' })}</option>
              <option value="非活跃">{intl.formatMessage({ id: 'users.inactive' })}</option>
              <option value="已禁用">{intl.formatMessage({ id: 'users.disabled' })}</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{intl.formatMessage({ id: 'common.loading' })}</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p>{intl.formatMessage({ id: 'common.error' })}: {(error as Error).message}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        {intl.formatMessage({ id: 'users.name' })}
                        <FaSort className="w-3 h-3" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        {intl.formatMessage({ id: 'users.email' })}
                        <FaSort className="w-3 h-3" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        {intl.formatMessage({ id: 'users.role' })}
                        <FaSort className="w-3 h-3" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        {intl.formatMessage({ id: 'users.status' })}
                        <FaSort className="w-3 h-3" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        {intl.formatMessage({ id: 'users.lastLogin' })}
                        <FaSort className="w-3 h-3" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {intl.formatMessage({ id: 'common.actions' })}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.status === '活跃' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                              user.status === '非活跃' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{user.lastLogin}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            {user.status !== '已禁用' ? (
                              <button 
                                className="text-red-500 hover:text-red-700" 
                                title={intl.formatMessage({ id: 'users.disable' })}
                                onClick={() => handleToggleUserStatus(user.id, user.status)}
                              >
                                <FaTimes className="w-4 h-4" />
                              </button>
                            ) : (
                              <button 
                                className="text-green-500 hover:text-green-700" 
                                title={intl.formatMessage({ id: 'users.enable' })}
                                onClick={() => handleToggleUserStatus(user.id, user.status)}
                              >
                                <FaCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                              <FaEllipsisV className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                        {intl.formatMessage({ id: 'users.noUsers' })}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button 
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => changePage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                >
                  {intl.formatMessage({ id: 'pagination.previous' })}
                </button>
                <button 
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => changePage(page + 1)}
                  disabled={page * limit >= total}
                >
                  {intl.formatMessage({ id: 'pagination.next' })}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {intl.formatMessage(
                      { id: 'pagination.showing' },
                      {
                        from: Math.min((page - 1) * limit + 1, total),
                        to: Math.min(page * limit, total),
                        total: total
                      }
                    )}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => changePage(Math.max(1, page - 1))}
                      disabled={page <= 1}
                    >
                      <span className="sr-only">{intl.formatMessage({ id: 'pagination.previous' })}</span>
                      &laquo;
                    </button>
                    
                    {/* 生成页码按钮 */}
                    {Array.from({ length: Math.min(5, Math.ceil(total / limit)) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => changePage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                            pageNum === page
                              ? 'bg-primary/10 text-primary'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button 
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => changePage(page + 1)}
                      disabled={page * limit >= total}
                    >
                      <span className="sr-only">{intl.formatMessage({ id: 'pagination.next' })}</span>
                      &raquo;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
