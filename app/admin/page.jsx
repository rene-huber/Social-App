"use client"
import { useSession } from "next-auth/react";


function Admin() {

 
    console.log(useSession(), "session")

  return (
    <div>Admin</div>
  )
}

export default Admin