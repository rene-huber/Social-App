"use client";
import { signIn,signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react"
import css from "./loginPage.module.css"
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

 

const LoginPage = () => {
  const status = useSession();
  const router = useRouter();
 
  useEffect(() => {
    if (status.status === "authenticated") {
      router.push("/posts");
    }
  }, [status.status, router]);


  const [data, setData] = useState({
    email: '',
    password: ''
    })
  

const loginUser = async (e) => {
  e.preventDefault()
  signIn('credentials',
   {...data, redirect: false
  })

  .then((callback) => {
      if (callback?.error) {
          toast.error(callback.error)
      }

      if(callback?.ok && !callback?.error) {
          toast.success('Logged in successfully!')
          router.push("/posts");
      }
  } )
}


 
  return (
    <div className={css.container}>
  



      <div className={css.wrapper}>
        <div className={css.socialButton} onClick={() => signIn("google")}>
        <FontAwesomeIcon icon={faGoogle} /> &nbsp; Sign in with Google
        </div>

        <div className={css.socialButton} onClick={() => signIn("github")}>
        <FontAwesomeIcon icon={faGithub} /> &nbsp; Sign in with Github</div>
        <div className={css.socialButton} onClick={() => signIn("facebook")}>
        <FontAwesomeIcon icon={faFacebook} /> &nbsp; Sign in with Facebook</div>



        <form onSubmit={loginUser}>
  <div >
  <div className={css.emailLabel}>
    <label htmlFor="email" ><FontAwesomeIcon icon={faEnvelope} /> Email address</label>  
   </div>
    <div>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
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
    <button type="submit">Sign in</button>
  </div>
</form>
<Link href={`/register`}className={css.register}><FontAwesomeIcon icon={faUser}/> Dont have an account? </Link> 
      </div>
     



     
    </div>
  );
};

export default LoginPage;
