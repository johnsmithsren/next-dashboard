/**
 * API 服务类
 * 提供与后端 API 交互的方法
 */

// 用户类型定义
export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

// 文档类型定义
export interface Document {
  id: string | number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string | number;
}

// 分析数据类型定义
export interface AnalyticsData {
  userCount: number;
  documentCount: number;
  activeUsers: number;
  recentActivities: Array<{
    id: string | number;
    userId: string | number;
    action: string;
    target: string;
    timestamp: string;
  }>;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// 根据环境获取 API 基础路径
const getApiBaseUrl = (): string => {
  // 在服务器端运行时
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL + "/api";
  }

  // 在客户端运行时
  return process.env.NEXT_PUBLIC_API_URL + "/api";
};

// API 基础路径
const API_BASE_URL = getApiBaseUrl();

/**
 * 通用请求处理函数
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // 如果响应不成功，抛出错误
  if (!res.ok) {
    const error = new Error("API 请求失败") as Error & {
      info?: unknown;
      status?: number;
    };

    try {
      const data = await res.json();
      error.info = data;
      error.status = res.status;
    } catch (e) {
      console.log(e);
      error.status = res.status;
    }
    throw error;
  }

  // 对于 204 No Content 响应，返回 null
  if (res.status === 204) {
    return null as unknown as T;
  }

  // 解析响应 JSON
  return res.json();
}

/**
 * 用户相关 API
 */
export const userAPI = {
  /**
   * 获取用户列表
   */
  getUsers: async (
    params?: Record<string, string>
  ): Promise<PaginatedResponse<User>> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return fetchAPI<PaginatedResponse<User>>(`/users${queryString}`);
  },

  /**
   * 获取单个用户
   */
  getUser: async (id: string | number): Promise<User> => {
    return fetchAPI<User>(`/users/${id}`);
  },

  /**
   * 创建用户
   */
  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    return fetchAPI<User>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * 更新用户
   */
  updateUser: async (
    id: string | number,
    userData: Partial<User>
  ): Promise<User> => {
    return fetchAPI<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  /**
   * 删除用户
   */
  deleteUser: async (id: string | number): Promise<null> => {
    return fetchAPI<null>(`/users/${id}`, {
      method: "DELETE",
    });
  },
};

/**
 * 文档相关 API
 */
export const documentAPI = {
  /**
   * 获取文档列表
   */
  getDocuments: async (
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Document>> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return fetchAPI<PaginatedResponse<Document>>(`/documents${queryString}`);
  },

  /**
   * 获取单个文档
   */
  getDocument: async (id: string | number): Promise<Document> => {
    return fetchAPI<Document>(`/documents/${id}`);
  },

  /**
   * 创建文档
   */
  createDocument: async (
    documentData: Omit<Document, "id" | "createdAt" | "updatedAt">
  ): Promise<Document> => {
    return fetchAPI<Document>("/documents", {
      method: "POST",
      body: JSON.stringify(documentData),
    });
  },

  /**
   * 更新文档
   */
  updateDocument: async (
    id: string | number,
    documentData: Partial<Omit<Document, "id" | "createdAt" | "updatedAt">>
  ): Promise<Document> => {
    return fetchAPI<Document>(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(documentData),
    });
  },

  /**
   * 删除文档
   */
  deleteDocument: async (id: string | number): Promise<null> => {
    return fetchAPI<null>(`/documents/${id}`, {
      method: "DELETE",
    });
  },
};

/**
 * 分析相关 API
 */
export const analyticsAPI = {
  /**
   * 获取仪表盘数据
   */
  getDashboardData: async (): Promise<AnalyticsData> => {
    return fetchAPI<AnalyticsData>("/analytics/dashboard");
  },

  /**
   * 获取用户活动数据
   */
  getUserActivity: async (
    params?: Record<string, string>
  ): Promise<PaginatedResponse<AnalyticsData["recentActivities"][0]>> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return fetchAPI<PaginatedResponse<AnalyticsData["recentActivities"][0]>>(
      `/analytics/user-activity${queryString}`
    );
  },
};

// 导出所有 API 服务
const api = {
  user: userAPI,
  document: documentAPI,
  analytics: analyticsAPI,
};

export default api;
