"use client";
import Link from "next/link";
import css from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (<>
        <Link href="/login" className={css.link}>
          Login
        </Link>

        <Link href="/register" className={css.link}>
         Register
        </Link>
        </>

      ) : (
        <>
          <Link href="/create-post" className={css.link}>
            create post
          </Link>
          <span className={css.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
