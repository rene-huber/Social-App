"use client";

import Image from "next/image";
import styles from "./create.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



const CreatePost = () => {
  const { status } = useSession();
  const router = useRouter();

  const CLOUD_NAME = 'huberlin';
  const UPLOAD_PRESET = 'blog13';

  const [photo, setPhoto] = useState('');
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

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
    const imageUrl = await uploadImage()
    if (!imageUrl) {
      console.error("Failed to upload image.");
      return
    }

    const slug = slugify(title);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        desc,
        img: imageUrl, 
        slug,
        catSlug: catSlug || "cat-a", 
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } else {
      console.error("Failed to create post.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="cat-a">cat-a</option>
        <option value="cat-b">cat-b</option>
        <option value="cat-c">cat-c</option>
      </select>
      <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
      <label htmlFor='image'>Upload Image</label>
      <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
      {isLoading ? <p>wait..upload</p> : null}
      {error ? <p>Error: {error}</p> : null}
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePost;
