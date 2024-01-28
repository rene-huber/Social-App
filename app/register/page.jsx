'use client'

import { useState } from "react"
import { signIn,signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';


export default function Register() {
  const { status } = useSession();
  const router = useRouter();


    const [data, setData] = useState({
         name: '',
          email: '',
           password: ''
         })

         const registerUser = async (e) => {
            e.preventDefault()
            try {
              const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (res.ok) {
                setData({ name: "", email: "", password: "" });
                toast.success("User has been registered!");
                router.push('/login')

              } else {
                toast.error("Something went wrong!");
              }
            } catch (error) {
              toast.error("An error occurred while making the request.");
            }
         }
         if (status === "authenticated") {
          console.log("si", status)
        // router.push("/")
      }
      
    

         return (
          <div>
            <div>
              <form onSubmit={registerUser}>
                <div>
                  <label htmlFor="name">Name</label>
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email address</label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>
                </div>
        
                <div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
        
                <div>
                  <button type="submit">Register</button>
                </div>
              </form>
        
              <section>
        <div>OR</div>
        {status === "authenticated" ? (
    <button onClick={() => signOut()}>Log Out</button>
        ) : (
          <p>Not signed in</p>
        )}
      </section>

            </div>
          </div>
        );
        
  }