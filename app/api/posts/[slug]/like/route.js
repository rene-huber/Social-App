
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
    let action; // Acción realizada: 'liked' o 'unliked'

    const existingLike = await prisma.like.findUnique({
      where: {
        postSlug_userEmail: {
          postSlug: slug,
          userEmail: userEmail,
        },
      },
    });

    if (existingLike) {

      
      await prisma.like.delete({ where: { id: existingLike.id } });
      action = 'unliked';

      // await prisma.post.update({
      //   where: { slug: slug },
      //   data: {
      //     likesCount: {
      //       decrement: action === 'unliked' ? 1 : 0,
      //     },
      //   },
      //   select: {
      //     likesCount: true,
      //   },
      // });

    } else {
      like = await prisma.like.create({
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

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     let like = await prisma.like.findUnique({
//       where: {
//         postSlug_userEmail: {
//           postSlug: slug,
//           userEmail: userEmail,
//         },
//       },
//     });

//     if (like) {
//       await prisma.like.delete({ where: { id: like.id } });
//     } else {
//       like = await prisma.like.create({
//         data: { postSlug: slug, userEmail: userEmail },
//       });
//     }

//     return new NextResponse(JSON.stringify(like, { status: 200 }));
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

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
      where: {
        postSlug: slug,
      },
    });

    return new NextResponse(JSON.stringify({ likesCount, likeUser }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
  