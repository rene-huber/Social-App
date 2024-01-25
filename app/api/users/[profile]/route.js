

import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation'






export const GET = async (req, { params }) => {
  const { id } = params;

 

  try {

const post = await prisma.post.findMany();


return new NextResponse(JSON.stringify({ post }, { status: 200 }));
    
   

  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


  
  










// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const postSlug = searchParams.get("postSlug");

//   try {
//     const comments = await prisma.user.findMany();

//     return new NextResponse(JSON.stringify(comments, { status: 200 }));
//   } catch (err) {
//     // console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

