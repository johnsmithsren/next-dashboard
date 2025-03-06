import { NextRequest, NextResponse } from 'next/server';

// 后端 API 的基础 URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

/**
 * 获取单个用户信息
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 可以在这里对数据进行转换，以适应前端需求
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching user:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch user from backend service' },
      { status: 500 }
    );
  }
}

/**
 * 更新用户信息
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    
    // 可以在这里添加额外的验证逻辑
    
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error updating user:`, error);
    return NextResponse.json(
      { error: 'Failed to update user in backend service' },
      { status: 500 }
    );
  }
}

/**
 * 删除用户
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting user:`, error);
    return NextResponse.json(
      { error: 'Failed to delete user in backend service' },
      { status: 500 }
    );
  }
}
