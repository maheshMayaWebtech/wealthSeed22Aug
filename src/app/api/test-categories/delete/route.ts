import TestCategory from "@/models/TestCategory";
import TestModule from "@/models/TestModule";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    // check how many modules with same id, if not 0 (zero) then return false that we 
    const findById = await TestModule.findOne({categoryId: id})
    if(!findById) {
      await TestCategory.deleteOne({ _id: id });
      return NextResponse.json(
        { message: "Category deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({message: "Still data left in this Category"}, {status: 403})
    }
  } catch (error) {
    return NextResponse.error();
  }
}
