import Image from "next/image"
import Link from "next/link"
import dancingBaby from "../../public/dancingbaby.gif"
import styles from "./user.module.css"

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


const User = async ({ item }) => {
  
  const slugifiedName = slugify(item.name);
 
  
  return (
    <div key={item.title}>
     
     
     <Link href={`/user/${item.id}`} className={styles.header}>
     <Image src={item?.image || dancingBaby } alt={item.title} width={30} height={30} className={styles.avatar} />
     <p>
  {item.name
    .toLowerCase()
    .substring(0, 11)
    .replace(/^./, str => str.toUpperCase())}
</p>

          
   
        </Link>
    
 
     
 
      
     
    </div>
  );
};

export default User;
