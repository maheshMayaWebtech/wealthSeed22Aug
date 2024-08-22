import BlogPost from '@/models/BlogPost';
import dbConnect from '@/utils/dbConnect';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await BlogPost.deleteOne({ _id: id });
        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.error();
    }
}
