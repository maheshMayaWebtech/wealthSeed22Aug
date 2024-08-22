import TestCategory from "@/models/TestCategory";
import dbConnect from "../../../../utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const req = await request.json();
    const { _id, category, description } = req;
    if (!_id || !category || !description) {
      return NextResponse.json({ message: "Item Missing" }, { status: 403 });
    }
    const updateCategory = await TestCategory.updateOne(
      { _id },
      { category, description }
    );
    if (updateCategory.acknowledged) {
      return NextResponse.json(
        { message: "Category edited successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.error();
  }
}
