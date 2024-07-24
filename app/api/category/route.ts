import { getAllCategories } from '../../utils/dbutil';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try
    {
    const categories = await getAllCategories();
    //return Response.json({ categories })
    return new Response(JSON.stringify({ categories }), {
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