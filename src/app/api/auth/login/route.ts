import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 后端 API 的基础 URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

/**
 * 用户登录 API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 调用后端登录 API
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Login failed' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // 创建响应对象
    const responseObj = NextResponse.json(data);
    
    // 设置认证令牌 cookie
    // 注意：在生产环境中，应该设置 secure: true 和 httpOnly: true
    responseObj.cookies.set('auth_token', data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      sameSite: 'strict',
    });
    
    return responseObj;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
