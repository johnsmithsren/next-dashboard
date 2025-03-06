import { fetchAPI } from './api';

// 用户认证信息类型
export interface AuthCredentials {
  email: string;
  password: string;
}

// 用户注册信息类型
export interface RegisterData extends AuthCredentials {
  name: string;
  role?: string;
}

// 认证响应类型
export interface AuthResponse {
  token: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    role: string;
  };
}

// 令牌状态类型
export interface TokenStatus {
  valid: boolean;
  user?: {
    id: string | number;
    name: string;
    email: string;
    role: string;
  };
}

/**
 * 认证服务
 * 提供用户认证相关功能
 */
export const authService = {
  /**
   * 用户登录
   * @param credentials 用户凭证
   * @returns 认证响应
   */
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * 用户注册
   * @param data 注册数据
   * @returns 认证响应
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * 用户登出
   * @returns 成功响应
   */
  logout: async (): Promise<void> => {
    return fetchAPI<void>('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * 验证令牌
   * @returns 令牌状态
   */
  verifyToken: async (): Promise<TokenStatus> => {
    return fetchAPI<TokenStatus>('/auth/verify');
  },

  /**
   * 刷新令牌
   * @returns 新的认证响应
   */
  refreshToken: async (): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/refresh', {
      method: 'POST',
    });
  },

  /**
   * 获取当前用户信息
   * @returns 用户信息
   */
  getCurrentUser: async () => {
    return fetchAPI('/auth/me');
  },

  /**
   * 重置密码请求
   * @param email 用户邮箱
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    return fetchAPI<void>('/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * 确认密码重置
   * @param token 重置令牌
   * @param password 新密码
   */
  confirmPasswordReset: async (token: string, password: string): Promise<void> => {
    return fetchAPI<void>('/auth/password-reset/confirm', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// 导出认证服务
export default authService;
