import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import TestModule from "@/models/TestModule";


export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const category = formData.get("category") as string;
    const categoryId = formData.get("categoryId") as string;
    const _id = formData.get("_id") as string;
    if (
      !title ||
      !description ||
      !url ||
      !category ||
      !categoryId ||
      !_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await TestModule.updateOne(
        { _id },
        {
            title,
            description,
            url,
            category,
            categoryId,
          }
      );
    // const newModule = await Module.create();
    return NextResponse.json(
      { success: true, message: "Updated successfully" },
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
