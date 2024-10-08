import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import TestModule from '@/models/TestModule';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { _id } = await request.json();
    const modules = await TestModule.find({_id});
    return NextResponse.json(modules);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}
export async function GET() {
  try {
    await dbConnect();
    const modules = await TestModule.find({});
    return NextResponse.json(modules);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}