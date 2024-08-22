import BlogPost from "@/models/BlogPost";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(): Promise<NextResponse> {
    await dbConnect();
  
    try {
      const posts = await BlogPost.find({});
      return NextResponse.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
  }