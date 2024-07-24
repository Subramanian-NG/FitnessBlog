import clientPromise from "@/app/utils/dbconnect";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const postId = searchParams.get('postId');

        const client = await clientPromise;
        const db = client.db();

        if (userId && postId) {
            const bookmark = await db.collection('bookmarks').findOne({ userId, postId });
            return Response.json({ bookmarked: !!bookmark });
        } else if (userId) {
            const bookmarks = await db.collection('bookmarks').find({ userId }).toArray();
            const postIds = bookmarks.map((bookmark) => bookmark.postId);

            const posts = await db.collection('posts').find({ _id: { $in: postIds.map(id => new ObjectId(id)) } }).toArray();
            
            return Response.json({ bookmarkedPosts: posts });
        } else {
            return Response.json({ error: 'Missing userId parameter' });
        }
    } catch (error) {
        return Response.json({ error: 'Failed to fetch bookmark status: ' + error });
    }
}

export async function POST(req: NextRequest) {
    try {
        //console.log('post request');
        const { userId, postId } = await req.json();
        //console.log("post request userId--",userId);
        const client = await clientPromise;
        const db = client.db();

        await db.collection('bookmarks').insertOne({ userId, postId });

        return Response.json({ message: 'Bookmark added' });
    } catch (error) {
        return Response.json({ error: 'Failed to add bookmark: ' + error });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId, postId } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        await db.collection('bookmarks').deleteOne({ userId, postId });

        return Response.json({ message: 'Bookmark removed' });
    } catch (error) {
        return Response.json({ error: 'Failed to remove bookmark: ' + error });
    }
}