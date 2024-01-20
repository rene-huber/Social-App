'use client'

import { useSession, signOut } from 'next-auth/react';
import { useRouter, redirect } from "next/navigation"
import dancingbaby from "@/public/dancingbaby.gif";
import Image from "next/image";


const Dashboard = () => {
  // const status = useSession();


  const { data: session } = useSession()

console.log(session?.user.role)

if(session?.user?.role !== "ADMIN"){
  redirect('/login');
    }

    else {
  
  return (
<div>
      <h1>ONLY user ADMIN </h1>
      <Image src={dancingbaby} alt="user image" width={400} height={400}   />
     
    </div>
  )
}
}

export default Dashboard