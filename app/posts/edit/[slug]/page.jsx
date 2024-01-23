"use client";

import Image from "next/image";
import styles from "./create.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'



const EditPost =  ({ params, page, cat }) => {

  const router = useRouter();
  const slug = params.slug;

  const CLOUD_NAME = 'huberlin';
  const UPLOAD_PRESET = 'blog13';

  const [photo, setPhoto] = useState('');
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

console.log(slug, 'slug55555555555');

  useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhost:3000/api/posts/${slug}`)

            const data = await res.json()
console.log(data, "blogcececsecsecsecsecsecs");
            setTitle(data?.post?.title)
            setDesc(data?.post?.desc)
            setPhoto(data?.post?.img)
           
        }
        fetchBlog()

    }, [])




  const uploadImage = async () => {
    if (!photo) return;

    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setIsLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error(error);
      setError("Error upload image");
      setIsLoading(false);
      return null;
    }
  };

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const slug = slugify(title);
console.log(slug, "slug 8888888888888888888")
    const body = { title , desc}
    
    const res = await fetch(`/api/posts/${slug}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(body)
     
    });
    if(!res || res.status !== 200) {
        alert('Error')
        console.log("errororororororororor");
        return
    }

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } else {
      console.error("Failed to create post.");
    }
  };





  return (
    <form onSubmit={handleSubmit}>
   
     
      <label htmlFor='image'>{title}</label>
      <textarea placeholder='Description...'  value={desc} onChange={(e) => setDesc(e.target.value)} />
<Image src={photo} width={200} height={200}  alt="blabla"/>
 
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
