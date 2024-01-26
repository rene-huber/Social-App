"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function DeletePost({ slug }) {
  const { data: session, status } = useSession();
  const router = useRouter();


  
  const handleDelete = async (slug) => {
    
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (status !== "authenticated") {
    return <p>Loading...</p>;
  }

  return <button onClick={() => handleDelete(slug)}>Delete Post</button>;
}

export default DeletePost;
