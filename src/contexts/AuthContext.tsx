"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import authService, { AuthResponse } from "@/services/auth";

// 用户类型
interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

// 认证上下文类型
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者属性类型
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 认证上下文提供者
 * 管理应用的认证状态
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const intl = useIntl();

  // 初始化认证状态
  useEffect(() => {
    const initAuth = async () => {
      // 从本地存储获取令牌
      const storedToken = localStorage.getItem("auth_token");

      if (storedToken) {
        try {
          // 验证令牌
          const { valid, user } = await authService.verifyToken();

          if (valid && user) {
            setUser(user);
            setToken(storedToken);
          } else {
            // 令牌无效，清除本地存储
            localStorage.removeItem("auth_token");
          }
        } catch (err) {
          console.error("Failed to verify token:", err);
          localStorage.removeItem("auth_token");
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * 处理认证响应
   * @param response 认证响应
   */
  const handleAuthResponse = (response: AuthResponse) => {
    const { token, user } = response;

    // 保存令牌到本地存储
    localStorage.setItem("auth_token", token);

    // 更新状态
    setToken(token);
    setUser(user);
    setError(null);
  };

  /**
   * 用户登录
   * @param email 邮箱
   * @param password 密码
   * @returns 是否登录成功
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login({ email, password });
      handleAuthResponse(response);

      return true;
    } catch (err) {
      const errorMessage = intl.formatMessage({
        id: "login.error.invalidCredentials",
      });
      setError(errorMessage);
      console.error("Login error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 用户注册
   * @param name 姓名
   * @param email 邮箱
   * @param password 密码
   * @returns 是否注册成功
   */
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register({ name, email, password });
      handleAuthResponse(response);

      return true;
    } catch (err) {
      const errorMessage = intl.formatMessage({
        id: "login.error.serverError",
      });
      setError(errorMessage);
      console.error("Register error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 用户登出
   */
  const logout = async () => {
    try {
      setIsLoading(true);

      // 调用登出 API
      await authService.logout();

      // 清除本地存储和状态
      localStorage.removeItem("auth_token");
      setUser(null);
      setToken(null);

      // 重定向到登录页面
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 清除错误
   */
  const clearError = () => {
    setError(null);
  };

  // 上下文值
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * 使用认证上下文的钩子
 * @returns 认证上下文
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
