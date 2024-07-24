// pages/api/posts/[postId].ts

import { getPostById, updatePost, deletePost } from '../../../utils/dbutil';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const postId = params.postId;
    try
    {
    const post = await getPostById(postId);
    return Response.json({ post })
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const postId = params.postId;
   try
   {
    const formData = await req.formData();
    const updatePostData: any = {};
    if (formData.has('title')) {
        updatePostData.title = formData.get('title');
    }
    if (formData.has('content')) {
        updatePostData.content = formData.get('content');
    }
    if (formData.has('category')) {
        updatePostData.category = formData.get('category');
    }
    const updatedPost = await updatePost(postId, updatePostData);
    return Response.json({ updatedPost })
   }
   catch(error)
   {
        return Response.json({ "error":"error in getting requests "+error })
   }
   
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const postId = params.postId;
    try
    {
    const post = await deletePost(postId);
    return Response.json({ post })
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
    
}
