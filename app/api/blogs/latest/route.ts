// app/api/blogs/route.ts

import { getAllLatestPosts } from '../../../utils/dbutil';

export async function GET(req: Request) {
   
    try{
    const posts = await getAllLatestPosts();
    // return Response.json({ posts })
    return new Response(JSON.stringify({ posts }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
}

