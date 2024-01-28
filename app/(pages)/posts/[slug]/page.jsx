import { getServerSession } from "next-auth";
import { getCurrentUser } from '@/utils/session';
import styles from "./onePost.module.css"
import {timeSince }from "@/utils/time";


import { authOptions } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import Image from "next/image";
import DeletePost from "@/components/deletePost/DeletePost";
import EditPost from "@/components/edit/Edit";
import Comments from "@/components/comments/Comments";
import Card from "@/components/card/Card";
import UserList from "@/components/users-list/UsersList";
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


const onePost = async ({ params, page, cat }) => {

  const userr = await getCurrentUser();
  const slug = params.slug;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;



 
  
  const getData = async (page, cat) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    }, { next: { revalidate: 0 } });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const data = await getData();



if(data?.post ){
  try {
    if (userEmail) {
      const viewExists = await prisma.postView.findUnique({
        where: {
          postSlug_userEmail: {
            postSlug: slug,
            userEmail: userEmail,
          },
        },
      });
    
      if (!viewExists) {
        await prisma.post.update({
          where: { slug},
          data: { views: { increment: 1 } },
        });
    
        await prisma.postView.create({
          data: {
            postSlug: slug,
            userEmail: userEmail,
          },
        });
      }
    }
    
  } catch (error) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}

  





return (
  <> 
    <div className={styles.imageContainer}>
    <p className={styles.time}>{timeSince(data?.post?.createdAt)}</p>
      <Image 
        src={data?.post?.img} 
        alt={data?.post?.title} 
        width={480} 
        height={480} 
        className={styles.postImage} 
      />
    </div>

    <div className={styles.textContainer}>
    <div className={styles.header}>
      <UserList authorEmail={data?.post?.userEmail} />
      <p className={styles.views}><FontAwesomeIcon icon={faEye} /> views: {data?.post?.views}</p>
      
      </div>
      
      <p className={styles.postDescription}>{data?.post?.desc}</p>
      {data?.post?.userEmail === userEmail && <>
        <DeletePost slug={slug} session={session} />  
       
      <div className={styles.edit}>
      <Link href={`/posts/edit/${data?.post?.slug}`}><FontAwesomeIcon icon={faPencil} />  EDIT</Link> {" "}{" "}
      </div>
      </>
      }
      
      <Comments postSlug={slug} />
    </div>
  </>
);
};


export default onePost;
