"use client";
import Link from "next/link";
import css from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  }

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/" className={css.link}>
            Login
          </Link>

          <Link href="/register" className={css.link}>
            Register
          </Link>
        </>
      ) : (
        <>
          <Link href="/create-post" className={css.link}>
            Create Post
          </Link>
          <span className={css.link} onClick={handleLogout}>
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
