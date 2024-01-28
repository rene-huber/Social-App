
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { getCurrentUser } from "@/utils/session";
import LikeButton from "../like/LikeButton";
// import Follow from "../follow/Follow";
import UserList from "../users-list/UsersList";
import {timeSince }from "@/utils/time";
import prisma from "@/utils/prismaConnect";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';


const Card = async ({ item }) => {

  const userr = await getCurrentUser();
  
  const pro = await prisma.user.findMany()
  console.log(userr, "4f4f44f4f4f4f4f4f4f4f4f4f4f4")
  
  return (
    <div className={styles.container} key={item.title}>

   <header className={styles.header}>
   <UserList authorEmail={item.userEmail} />
     <p>{timeSince(item.createdAt)}</p>
    </header>

      <Link href={`/posts/${item.slug}`}>
      
        {item.img && (
          <Image src={item.img} className={styles.imageContainer} alt={item.title} width={300} height={300} />
        )}
         </Link>

        <div className={styles.dataContainer}>
       
       <div className={styles.left}>
       <Link href={`/posts/${item.slug}`}>
          <p><FontAwesomeIcon icon={faComment} /> comments: {item.commentCount}</p>
          </Link>
          <p><FontAwesomeIcon icon={faEye} /> views: {item.views}</p>
         </div>

          <div className={styles.right}>
          <LikeButton userEmail={userr?.user.email} slug={item.slug} />
      {
        item.userEmail === userr?.user.email &&         
        <Link href={`/posts/edit/${item.slug}`}><FontAwesomeIcon icon={faPencil} />  EDIT</Link>
      }
      </div>



        </div>





    
      
   
      <p className={styles.description}>{item.desc.slice(0,88)}</p>
      {/* <Follow userEmail={userr?.user.email} authorEmail={item.userEmail} profile={userr?.user.id}/> */}
     
    </div>
  );
};

export default Card;