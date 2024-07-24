// app/api/blogs/route.ts

import { getAllLatestPosts } from '../../../utils/dbutil';

export async function GET(req: Request) {
   
    try{
    const posts = await getAllLatestPosts();
    return Response.json({ posts })
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
}

