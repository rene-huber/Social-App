import { getServerSession } from "next-auth";
import { getCurrentUser } from "@/utils/session";

import { authOptions } from "@/utils/auth";

import Image from "next/image";
import DeletePost from "@/components/deletePost/DeletePost";

import Comments from "@/components/comments/Comments";

const Profile = async ({ params, page, cat }) => {
  const userr = await getCurrentUser();
  const slug = params.slug;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;



  const post = await prisma.post.findMany({
    where: {
      
      userEmail: userEmail, // Filtra por el email del usuario
    },
  });





  return (
   <>
   
   {post.map((post) => (
      <div key={post.id}>
        <h1>{post.title}</h1>
        </div>
    ))}

   </>)
}


export default Profile;
