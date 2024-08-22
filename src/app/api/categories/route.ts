import Category from '@/models/Category';
import dbConnect from '@/utils/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { category, description } = await request.json();
    const newCategory = new Category({ category, description });
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
