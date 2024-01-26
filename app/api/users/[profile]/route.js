

import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation'




export const GET = async (req, { params }) => {
  const { profile } = params;


// export const GET = async (req) => {
//   const  {searchParams}  = new URL(req.url);

  // const postSlug = searchParams.get("postSlug");

  console.log(profile, "searchParams************ * * * ");

  

  try {
    const posts = await prisma.post.findMany({ where: {userEmail: userEmail} })
    
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

