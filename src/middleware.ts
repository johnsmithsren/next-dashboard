import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 定义需要保护的路由
const PROTECTED_ROUTES = [
  '/dashboard',
  '/api/users',
  '/api/documents',
  '/api/analytics',
];

// 定义公共 API 路由（不需要认证）
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
];

/**
 * 中间件函数
 * 处理认证和授权逻辑
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 检查是否是受保护的路由
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  // 检查是否是公共 API 路由
  const isPublicApiRoute = PUBLIC_API_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  // 如果是公共 API 路由，允许访问
  if (isPublicApiRoute) {
    return NextResponse.next();
  }
  
  // 如果是受保护的路由，检查认证
  if (isProtectedRoute) {
    // 从请求中获取认证令牌
    const authToken = request.cookies.get('auth_token')?.value;
    
    // 如果没有认证令牌，重定向到登录页面
    // 对于 API 请求，返回 401 未授权状态码
    if (!authToken) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    
    // 这里可以添加令牌验证逻辑
    // 例如，验证 JWT 令牌的有效性
    
    // 如果需要，可以在请求头中添加用户信息
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', 'user_id_from_token');
    
    // 继续处理请求，但带上修改后的头部
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // 对于其他路由，直接放行
  return NextResponse.next();
}

// 配置中间件匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - 静态文件 (如 /favicon.ico, /images/*, 等)
     * - 公共资源 (如 /public/*)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
