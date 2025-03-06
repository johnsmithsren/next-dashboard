import { useState, useEffect, useCallback } from 'react';
import { PaginatedResponse } from '@/services/api';

/**
 * 通用 API 钩子
 * 用于在组件中处理 API 请求
 */
export function useApi<T, E = Error>(
  apiFunction: (...args: any[]) => Promise<T>,
  immediate = false,
  ...params: any[]
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 执行 API 请求的函数
  const execute = useCallback(
    async (...executeParams: any[]): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        
        // 使用传入的参数或执行时提供的参数
        const result = await apiFunction(...(executeParams.length ? executeParams : params));
        setData(result);
        return result;
      } catch (err) {
        setError(err as E);
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, ...params]
  );

  // 如果 immediate 为 true，则在组件挂载时立即执行
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    error,
    loading,
    execute,
    setData,
    setError,
  };
}

/**
 * 分页 API 钩子
 * 用于处理分页数据
 */
export function usePaginatedApi<T, E = Error>(
  apiFunction: (page: number, limit: number, ...args: any[]) => Promise<PaginatedResponse<T>>,
  initialPage = 1,
  initialLimit = 10,
  ...params: any[]
) {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<T[]>([]);

  const { data, error, loading, execute } = useApi<PaginatedResponse<T>, E>(
    async (p = page, l = limit, ...args) => {
      const result = await apiFunction(p, l, ...args);
      setTotal(result.total);
      setItems(result.data);
      return result;
    },
    true,
    page,
    limit,
    ...params
  );

  // 更改页码
  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      execute(newPage, limit, ...params);
    },
    [execute, limit, ...params]
  );

  // 更改每页数量
  const changeLimit = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      // 当改变每页数量时，通常需要重置到第一页
      setPage(1);
      execute(1, newLimit, ...params);
    },
    [execute, ...params]
  );

  return {
    data: items,
    total,
    page,
    limit,
    error,
    loading,
    changePage,
    changeLimit,
    refresh: () => execute(page, limit, ...params),
  };
}

export default useApi;
