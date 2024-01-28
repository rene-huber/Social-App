'use client'
import React, { useState, useEffect } from 'react'
import css from "./navbar.module.css";
import Image from "next/image";
import noPicture from "@/public/dancingbaby.gif";
import dancingbaby from "@/public/dancingbaby.gif";
import logo from "@/public/logo.png";
import Link from "next/link";
import AuthLinks from "@/components/authLinks/AuthLinks";

import {signIn, signOut, useSession} from 'next-auth/react'
import Toggle from '../toggle/Toggle';
import User from '../user/User';


 



const Navbar = () => {
  
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();
        setData(data);
       
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getData();
  }, []);
 
  console.log("Data from getData():", data); // Mostrando los datos en consola

  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()

  const handleShowDropdown = () => setShowDropdown(prev => true)
  const handleHideDropdown = () => setShowDropdown(prev => false)
 


  return (
    <div className={css.container}>

      <div className={css.social}>
{
  session?.user ? (
    <Link href={`/posts`}>
    <Image src={logo} alt="user image" width={40} height={40} />
    </Link>
  ) : ( <p className={css.notSigned}>Social</p>
  )
}

   
      
      </div>
      <div className={css.userEmail}>
<p>last: </p>
      {data?.slice(0,3).map((item, index) => (
          <div key={index}>
            <Link href={`/user/${item.id}`}>
            
            <Image className={css.roundedImage} src={item?.image || dancingbaby } alt={item.title} width={30} height={30} />
          
            </Link>
          </div>
        ))}
            
      </div>
      <div className={css.links}>
      <Link href="/posts" className={css.link}>Home</Link>
        
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
