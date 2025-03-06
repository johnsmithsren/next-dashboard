import { NextRequest, NextResponse } from 'next/server';

// 后端 API 的基础 URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

/**
 * 通用代理处理函数
 * 将请求转发到实际的后端服务
 */
async function proxyRequest(req: NextRequest, path: string) {
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();
  const targetUrl = `${API_BASE_URL}${path}${searchParams ? `?${searchParams}` : ''}`;
  
  try {
    // 获取原始请求的方法、头部和正文
    const method = req.method;
    const headers = new Headers(req.headers);
    
    // 删除一些不需要或可能导致问题的头部
    headers.delete('host');
    
    // 构建转发请求的选项
    const requestInit: RequestInit = {
      method,
      headers,
      // 对于 GET 和 HEAD 请求，不包含 body
      ...(method !== 'GET' && method !== 'HEAD' && req.body ? { body: req.body } : {}),
    };
    
    // 发送请求到后端服务
    const response = await fetch(targetUrl, requestInit);
    
    // 从后端服务的响应中获取数据
    const data = await response.json();
    
    // 返回后端服务的响应
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error proxying request to ${targetUrl}:`, error);
    return NextResponse.json(
      { error: 'Failed to proxy request to backend service' },
      { status: 500 }
    );
  }
}

// 处理所有 HTTP 方法
export async function GET(req: NextRequest) {
  return proxyRequest(req, '/');
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, '/');
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, '/');
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req, '/');
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, '/');
}
