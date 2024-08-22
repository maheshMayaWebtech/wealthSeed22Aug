import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import TestModule from "@/models/TestModule";


export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const categoryId = formData.get("categoryId") as string;

    if (
      !title ||
      !description ||
      !url ||
      !category ||
      !categoryId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newModule = await TestModule.create({
      title,
      description,
      url,
      category,
      categoryId,
    });
    return NextResponse.json(
      { success: true, data: newModule },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}
