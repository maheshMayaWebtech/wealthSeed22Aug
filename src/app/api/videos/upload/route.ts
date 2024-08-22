// pages/api/videos/upload.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import dbConnect from '@/utils/dbConnect';
import BlogPost from '@/models/BlogPost';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const formData = await request.formData();
    const title: FormDataEntryValue = formData.get('title') ?? '';
    const chapter = formData.get('chapter') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;
    const youtubeUrl = formData.get('youtubeUrl') as string;

    if (!title || !image || !description || !youtubeUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'blog_images' }, (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error('Upload failed, no response from Cloudinary'));
        } else {
          resolve(result);
        }
      }).end(buffer);
    });

    const post = new BlogPost({
      title,
      chapter,
      description,
      youtubeUrl: youtubeUrl,
      image: cloudinaryResponse.secure_url,
    });

    await post.save();

    return NextResponse.json({ message: 'Blog post created successfully', post });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}


