import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dbConnect from "@/utils/dbConnect";
import HomePage from "@/models/HomePage";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloudinary(
  file: File,
  folder: string
): Promise<UploadApiResponse> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("Upload failed, no response from Cloudinary"));
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const formData = await request.formData();
    const homeTitle = formData.get("homeTitle") ?? "";
    const homeDescription = formData.get("homeDescription") as string;
    const homeSubtitle = formData.get("homeSubtitle") as string;
    const homeRightImage = formData.get("homeRightImage") as
      | File
      | string
      | null;
    const mainLogo = formData.get("mainLogo") as File | string | null;
    const _id = formData.get("_id") as string;

    if (
      !homeTitle ||
      !homeDescription ||
      !homeSubtitle ||
      !homeRightImage ||
      !mainLogo ||
      !_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let homeLogoImageLink = "";
    let homeRightImageLink = "";

    if (typeof mainLogo === "string") {
      homeLogoImageLink = mainLogo;
    } else {
      const mainLogoResponse = await uploadImageToCloudinary(
        mainLogo,
        "home_logos"
      );
      homeLogoImageLink = mainLogoResponse.secure_url;
    }
    if (typeof homeRightImage === "string") {
      homeRightImageLink = homeRightImage;
    } else {
      const homeRightImageResponse = await uploadImageToCloudinary(
        homeRightImage,
        "home_images"
      );
      homeRightImageLink = homeRightImageResponse.secure_url;
    }

    await HomePage.updateOne(
      { _id },
      {
        homeTitle,
        homeDescription,
        homeSubtitle,
        homeRightImage: homeRightImageLink,
        mainLogo: homeLogoImageLink,
      }
    );

    return NextResponse.json({
      message: "HomePage Edited successfully",
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const categories = await HomePage.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error();
  }
}
