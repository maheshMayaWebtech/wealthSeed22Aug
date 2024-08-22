import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; 
import LoginMain from '@/models/LoginMain'; 

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { id, password } = await request.json();
    const user = await LoginMain.findOne({ id });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if(user?.id !== id || user?.password !== password ) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Login successful', token: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Login endpoint' }, { status: 200 });
}
