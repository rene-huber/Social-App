
import { getCurrentUser } from '@/utils/session';
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/auth';


export const PUT = async (req,{ params}) => {
  const  {slug} = params;

  // const session = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  try {
    let like;
    let action; 


    const existingLike = await prisma.like.findUnique({
      where: {
        postSlug_userEmail: { postSlug: slug, userEmail: userEmail },
      },
    });


    if (existingLike) {

      
      await prisma.like.delete({ where: { id: existingLike.id } });
      action = 'unliked';

   


    } else {
      await prisma.like.create({
        data: { postSlug: slug, userEmail: userEmail },
      });

      action = 'liked';
     
    }



    return new NextResponse(JSON.stringify({ isLiked: action === 'liked', likesCount }), { status: 200 });

  } catch (err) {
    return new NextResponse(

            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
          );

  }
};


//--------------GET-----------nr likes---------
  
export const GET = async (req, { params }) => {
  const { slug } = params;

  const session = await getAuthSession();
  const userEmail = session?.user?.email;

  let likeUser = null;
  
  try {
  
    if (userEmail) {
      likeUser = await prisma.like.findUnique({
        where: {
          postSlug_userEmail: {
            postSlug: slug,
            userEmail: userEmail,
          },
        },
      });
    }

    
    const likesCount = await prisma.like.count({
      where: { postSlug: slug },
    });

    return new NextResponse(JSON.stringify({ likesCount, likeUser }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
  