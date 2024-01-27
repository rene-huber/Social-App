import UserList from "@/components/users-list/UsersList";
import prisma from "@/utils/prismaConnect";
import Image from "next/image";
import Link from "next/link";


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

return(
  <div>
   <UserList authorEmail={userEmail} />
    {posts?.map((item) => (
      <div key={item.title}>
        
        <Link href={`/posts/${item.slug}`}>
        <Image src={item.img} alt={item.title} width={130} height={130} />
        <p>{item.desc}</p>
        </Link>

       
      </div>
    ))}
  </div>
)




  
};

export default OnePost;
