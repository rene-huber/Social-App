import { Barlow } from 'next/font/google';
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import ThemeContext from "@/context/ThemeContext";

import ToasterContext from "@/providers/ToasterProvider";

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; 


// import UserList from "@/components/users-list/UsersList";

 
config.autoAddCss = false; // Don't add the CSS by default

library.add(faHeart);

const barlow = Barlow({
  weight: '100',
  style: 'normal',
  subsets: ['latin'],
})

export const metadata = {
  title: "Instaclone",
  description: "Like instagram but better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <AuthProvider>
          <ThemeContext>
            <ToasterContext />
            {children}
          </ThemeContext>
        </AuthProvider>
      </body>
    </html>
  );
}
