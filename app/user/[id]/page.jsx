

const onePost = async (req) => {

 const { slug } = req.params;


 
 const authorName  = "gopublicidad-estudiocreativo"
 
 const post = await prisma.post.findMany({
   where: {
     user: {
        name: slug
      }
    },
   
  });
  
  console.log(post, "slugrgsrbsrbdrbdrbdrbdrbdrbdrbdrbdrbh");



  return (
   <>
   
   {post.map((post) => (
      <div key={post.id}>
        <h1>{post.title}</h1>
        </div>
    ))}

   </>)
}


export default onePost;
