import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dbConnect from "@/utils/dbConnect";
import Module from "@/models/Module";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;
    const category = formData.get("category") as string;
    const categoryId = formData.get("categoryId") as string;
    const _id = formData.get("_id") as string;
    if (
      !title ||
      !image ||
      !description ||
      !content ||
      !category ||
      !categoryId ||
      !_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let newImageUrl = ''
    if (typeof image === "string") {
      newImageUrl = image
    } else {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cloudinaryResponse: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "module_images" }, (error, result) => {
              if (error) {
                reject(error);
              } else if (!result) {
                reject(new Error("Upload failed, no response from Cloudinary"));
              } else {
                resolve(result);
              }
            })
            .end(buffer);
        }
      );
      newImageUrl = cloudinaryResponse.secure_url
    }
    await Module.updateOne(
        { _id },
        {
            title,
            description,
            content,
            category,
            categoryId,
            image: newImageUrl,
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
