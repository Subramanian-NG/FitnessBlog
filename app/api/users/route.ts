
import { NextRequest } from 'next/server';
import { createUser} from '../../utils/dbutil';

export async function POST(req: NextRequest) {
 try
 {
  const body = await req.json(); // Use req.json() to parse JSON body data
  //console.log("Request Body:", body); 
  const createdUser = await createUser(body);
  console.log("Created user----")
  //console.log(createUser)
  return Response.json({ createdUser })
 }
 catch(error)
 {
      return Response.json({ "error":"error in getting requests "+error })
 }
 
}

