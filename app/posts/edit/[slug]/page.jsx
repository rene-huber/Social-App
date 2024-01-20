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
            const res = await fetch(`https://final-project-blue-ten.vercel.app/api/posts/${slug}`)

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
    <input type="text" placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="catSlug">cat-a</option>
        <option value="cat-a">cat-a</option>
        <option value="cat-b">cat-b</option>
        <option value="cat-c">cat-c</option>
      </select>
      <textarea placeholder='Description...'  value={desc} onChange={(e) => setDesc(e.target.value)} />
      <label htmlFor='image'>Upload Image</label>
<Image src={photo} width={200} height={200}  alt="blabla"/>
      <input id='image' type="file" style={{ display: 'none' }}  onChange={(e) => setPhoto(e.target.files[0])} />
      {isLoading ? <p>wait..upload</p> : null}
      {error ? <p>Error: {error}</p> : null}
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
