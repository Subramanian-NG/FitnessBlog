// app/api/blogs/route.ts

import { createPost, getAllPosts, getAllPostsForUser , updatePost} from '../../utils/dbutil';

export async function GET(req: Request) {
   
    try{
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    let posts;
    if(email==null)
    {
     posts = await getAllPosts();
    }
    else{
     posts = await getAllPostsForUser(email);
    }

    //console.log("returned posts-- ",posts);
    return Response.json({ posts })
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
}

export async function POST(req: Request) {
    try{
    const formData = await req.formData()
    //console.log('formData:', formData);
    const newPostData = {title:formData.get('title'),content:formData.get('content'),category:formData.get('category'),owner_id:formData.get("owner_id"),time: new Date().toISOString()}
    const newPost = await createPost(newPostData);
    return Response.json({ newPost})
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
    
}

export async function PUT(req: Request) {
    try{
    const formData = await req.formData()
    //console.log('formData:', formData);
    const postId : string= formData.get('id') as string;
    const newPostData = {title:formData.get('title'),content:formData.get('content'),category:formData.get('category'),owner_id:formData.get("owner_id"),id:formData.get("id")}
    const newPost = await updatePost(postId,newPostData);
    return Response.json({ newPost})
    }
    catch(error)
    {
        return Response.json({ "error":"error in getting requests "+error })
    }
    
}
