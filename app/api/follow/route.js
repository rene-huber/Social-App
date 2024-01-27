
import { getCurrentUser } from '@/utils/session';
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/auth';


export const PUT = async (req) => {
 
  const session = await getCurrentUser();
  const userEmail = session?.user?.email;

  console.log(session, "LIKEEEEEEEE 75757")

  

  try {
    let follow = await prisma.like.findUnique({
      where: {
        followerId_followingId: {
          postSlug: slug,
          followingId: userEmail,
        },
      },
    });

    if (follow) {
      await prisma.like.delete({ where: { id: follow.id } });
    } else {
      follow = await prisma.like.create({
        data: { postSlug: slug, userEmail: userEmail },
      });
    }

    return new NextResponse(JSON.stringify(follow, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};