import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { getCurrentUser } from "@/utils/session";
import LikeButton from "../like/LikeButton";
import Follow from "../follow/Follow";



const Card = async ({ item }) => {

  const userr = await getCurrentUser();
 
  const profile = userr?.user?.id
  
  return (
    <div className={styles.container} key={item.title}>
     
      <Link href={`/posts/${item.slug}`}>
        {item.img && (
          <Image src={item.img} alt={item.title} width={300} height={300} />
        )}
        <div className={styles.textContainer}>
       
          <h1>{item.title}</h1>
        </div>
      </Link>
      {
      item.userEmail === userr?.user.email &&         
        <Link href={`/posts/edit/${item.slug}`}>EDIT POST</Link>
      }
      <p>views: {item.views}</p>
      <LikeButton userEmail={userr?.user.email} slug={item.slug} />
      <Follow userEmail={userr?.user.email} authorEmail={item.userEmail} profile={profile} />
     
    </div>
  );
};

export default Card;
