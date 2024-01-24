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
console.log(userEmail, "userEmail")

  const posts = await prisma.post.findMany({ where: {userEmail: userEmail} })

return(
  <div>
    {posts?.map((item) => (
      <div key={item.title}>
        <h1>{item.title}</h1>
        <Link href={`/posts/${item.slug}`}>
        <Image src={item.img} alt={item.title} width={130} height={130} />
        </Link>

       
      </div>
    ))}
  </div>
)




  
};

export default OnePost;
