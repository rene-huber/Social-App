
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

  console.log(session, "LIKEEEEEEEE 75757")
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), { status: 401 }
    );
  }

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        postSlug_userEmail: { postSlug: slug, userEmail: userEmail },
      },
    });

    let response;

    console.log(existingLike, "existingLike55555555555555555555555");


    if (existingLike) {
      await prisma.like.delete({
        where: { userEmail: existingLike.userEmail },
      });
      response = { message: "Like removed" };
    } else {
      await prisma.like.create({
        data: { postSlug: slug, userEmail: userEmail },
      });
      response = { message: "Like added" };
    }

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};

//--------------GET-----------nr likes---------
  
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const likesCount = await prisma.like.count({
      where: { postSlug: slug },
    });

    return new NextResponse(JSON.stringify({ likesCount }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
  