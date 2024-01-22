"use client"
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data: comments, error } = useSWR(`/api/comments?postSlug=${postSlug}`, fetcher);
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc, postSlug }),
      });
      if (!res.ok) throw new Error('Error posting comment');
      await res.json();
      mutate(`/api/comments?postSlug=${postSlug}`); 
      setDesc('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (error) return <div>Failed to load comments</div>;
  if (!comments) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login" className={styles.btn_login}>Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {comments.map((item) => (
          <div className={styles.comment} key={item._id}>
            <div className={styles.user}>
              {item?.user?.image && (
                <Image
                  key={item._id}
                  src={item.user.image}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{item.user.name}</span>
                <span className={styles.date}>{item.createdAt}</span>
              </div>
            </div>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
