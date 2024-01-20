"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function EditPost({ slug }) {

  const { data: session, status } = useSession();
  const router = useRouter();
console.log(slug, 'slug inside');

  const CLOUD_NAME = 'huberlin';
  const UPLOAD_PRESET = 'blog13';

  const [title, setTitle] = useState("");
  

useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`https://final-project-blue-ten.vercel.app/api/posts/${slug}`)

            const data = await res.json()
console.log(data, "blogcececsecsecsecsecsecs");
            setTitle(data?.post?.title)
            setDesc(data.desc)
           
        }
        fetchBlog()

    }, [])








  const handleEdit = async (slug) => {
  
    e.preventDefault();  

    const body = {title}


    try {
      const res = await fetch(`https://final-project-blue-ten.vercel.app/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        router.push("/posts/${slug}");
      } else {
        console.error("Failed to EDit the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (status !== "authenticated") {
    return <p>Loading...</p>;
  }

//  return <button onClick={() => handleEdit(slug)}>Delete Post</button>;


return (
    <form onSubmit={handleEdit}>
      <input type="text" placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} />
     
      <button type="submit">Create</button>
        <button onClick={() => handleEdit(slug)}>EDITTT Post</button>
    </form>
  );
};





export default EditPost;
