
import { getCurrentUser } from '@/utils/session';
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/auth';


export const POST = async (req, res) => {

    const body = await req.json();


const followerEmail = body?.followerEmail;
const followingEmail = body?.followingEmail;



try {
    let follow;
    let action; 

    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: followerEmail,
                followingId: followingEmail,
            },
        },
    });

    if (existingFollow) {
        await prisma.follow.delete({ where: { id: existingFollow.id } });
        action = 'unfollowed';
    } else {
        follow = await prisma.follow.create({
            data: { followerId: followerEmail, followingId: followingEmail },
        });
        action = 'followed';
    }

    return new NextResponse(JSON.stringify({ isFollowed: action === 'followed' , follow}), { status: 200 });
} catch (err) {
    console.error(err);
    return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
}
};


export const GET = async (req, res) => {
    const body = await req.json();
    const followerEmail = body?.followerEmail;
const followingEmail = body?.followingEmail;
    // const session = await getCurrentUser();
    // const userEmail = session?.user?.email;

    try {
        const followers = await prisma.follow.findMany({
            where: { followingId: followingEmail }
        });
console.log(followers, 'followersge4ge4ge4ge4ge')

        return new NextResponse(
            JSON.stringify({ followers}, { status: 200 })
        );
    }
    catch (err) {
        console.error(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
}

