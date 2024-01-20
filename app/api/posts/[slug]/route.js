import { getAuthSession } from "@/utils/auth";
import  {authOptions}  from "@/utils/auth"
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import  getServerSession  from "next-auth/react";
import { getCurrentUser } from '@/utils/session';
import { useSession, getSession } from "next-auth/react"






export const DELETE = async (req,{ params}) => {
  const  {slug} = params;
  const session = await getCurrentUser();
  const userEmail = session?.user?.email;

console.log(slug, session, "4444444444444")  


    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {

      
  
      const post = await prisma.post.findUnique({ where: { slug } });
      if (!post || post.userEmail !== userEmail) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized" }, { status: 403 })
        );
      }
  
      await prisma.post.delete({
        where: { slug },
      });
  
      return new NextResponse(
        JSON.stringify({ message: "Post deleted successfully" }, { status: 200 })
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
  







export const GET = async (req, { params }) => {
  const { slug } = params;
  const session = await getAuthSession();




  try {

    // if (userEmail) {
    //   const viewExists = await prisma.postView.findUnique({
    //     where: {
    //       postSlug_userEmail: {
    //         postSlug: slug,
    //         userEmail: userEmail,
    //       },
    //     },
    //   });
  
    //   if (!viewExists) {
    //     await prisma.post.update({
    //       where: { slug},
    //       data: { views: { increment: 1 } },
    //     });
  
    //     await prisma.postView.create({
    //       data: {
    //         postSlug: slug,
    //         userEmail: userEmail,
    //       },
    //     });
    //   }
    // }

const post = await prisma.post.findUnique({
  where: { slug },

});
return new NextResponse(JSON.stringify({ post }, { status: 200 }));
    
  

    // const post = await prisma.post.update({
    //   where: { slug },
    //   data: { views: { increment: 1 } },
    //   include: { user: true },
    // });






  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


  
  
  
  
  
  // -------------------
  
  
  
  export const PUT = async (req,{ params}) => {
    const  {slug} = params;
    const session = await getCurrentUser();
    const userEmail = session?.user?.email;
  


    // if (!session) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    //   );
    // }
  
    try {
      const body = await req.json();
     
  
      
  
      const updatedPost = await prisma.post.update({
        where: { slug },
        data: {...body},
      });


    

  
      return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
  
  
  
  // -------------------




