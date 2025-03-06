import { NextRequest, NextResponse } from 'next/server';

// 后端 API 的基础 URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

/**
 * 获取用户列表
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams.toString();
    const targetUrl = `${API_BASE_URL}/users${searchParams ? `?${searchParams}` : ''}`;
    
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 可以在这里对数据进行转换，以适应前端需求
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users from backend service' },
      { status: 500 }
    );
  }
}

/**
 * 创建新用户
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 可以在这里添加额外的验证逻辑
    
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user in backend service' },
      { status: 500 }
    );
  }
}
