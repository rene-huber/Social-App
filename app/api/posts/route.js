import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { getCurrentUser } from '@/utils/session';







export const GET = async (req) => {

  const session = await getCurrentUser();
  const userEmail = session?.user?.email;

  console.log(session, "sessionrbvdrbdrbdrbdrbdrbdrb")
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true, 
      },
    });
    const postsWithCommentCount = posts.map(post => ({
      ...post,
      commentCount: post.comments.length
    }));

    // return new NextResponse(JSON.stringify({ posts }, { status: 200 }));
    return new NextResponse(JSON.stringify({ posts: postsWithCommentCount }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};




export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

