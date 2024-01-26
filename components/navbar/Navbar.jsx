'use client'
import React, { useState } from 'react'
import css from "./navbar.module.css";
import Image from "next/image";
import noPicture from "@/public/noImage.png";
import dancingbaby from "@/public/dancingbaby.gif";
import Link from "next/link";
import AuthLinks from "@/components/authLinks/AuthLinks";

import {signIn, signOut, useSession} from 'next-auth/react'
import Toggle from '../toggle/Toggle';
 

const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()

  const handleShowDropdown = () => setShowDropdown(prev => true)
  const handleHideDropdown = () => setShowDropdown(prev => false)
 


  return (
    <div className={css.container}>
      <div className={css.social}>
{
  session?.user ? (
    <Image src={dancingbaby} alt="user image" width={40} height={40} className={css.avatar} />
  ) : ( <p className={css.notSigned}>Social</p>
  )
}

   
      
      </div>
      <div className={css.userEmail}>
      

       {
            session?.user
              ? ( <p>{session?.user?.email}</p>)
              : (<p className={css.notSigned}>Not signed in</p>)
          }
   
      
      </div>
      <div className={css.links}>
        <Link href="/" className={css.link}>Home</Link>
        <Link href="/posts" className={css.link}>Posts</Link>
        {/* <Link href="/dashboard" className={css.link}>dashboard</Link> */}
        
<Toggle />
        <AuthLinks />
        {
            session?.user?.image
              ? ( <Image src={session?.user?.image} alt="user image" width={40} height={40} className={css.avatar} />)
              : (<Image src={noPicture} alt="user image" width={40} height={40} className={css.avatar} />)
          }
      </div>
    </div>
  );
};

export default Navbar;
