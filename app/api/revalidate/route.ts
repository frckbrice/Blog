import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


//* on-demand revalidation
export async function GET(req: NextRequest) {

  const secret = req.nextUrl.searchParams.get('secret');

  if(secret !== process.env.MY_SECRET_TOKEN) {
    return new NextResponse(JSON.stringify({message:'Invalid Token'}), {
      status: 401,
      statusText: 'UnAuthorized',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const path = req.nextUrl.searchParams.get('path') || '/' ;

  revalidatePath(path);

  return NextResponse.json({revalidated: true});
}