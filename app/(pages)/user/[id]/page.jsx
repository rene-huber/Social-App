import UserList from "@/components/users-list/UsersList";
import prisma from "@/utils/prismaConnect";
import Image from "next/image";
import Link from "next/link";
import styles from './user.module.css';


const OnePost = async ({ params }) => {

  const id = params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
});

const userEmail = user.email;

  const posts = await prisma.post.findMany({ 
    where: {userEmail: userEmail}, 
    include: { user: true }
  })

  return (
    <div className={styles.wrap}>
    
      <div className={styles.gridContainer}>
        {posts?.map((item) => (
          <div key={item.title} className={styles.gridItem}>

            <Link href={`/posts/${item.slug}`}>
              <Image src={item.img} alt={item.title} width={300} height={300} />
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OnePost;
