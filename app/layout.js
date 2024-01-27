import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import Navbar from "@/components/navbar/Navbar";
import ToasterContext from "@/providers/ToasterProvider";

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
// import UserList from "@/components/users-list/UsersList";

 
config.autoAddCss = false; // Don't add the CSS by default

library.add(faHeart);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRUD Test App",
  description: "microdosis lsd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContext>
            <ToasterContext />
            <Navbar />
          {/* <UserList /> */}
            
      
            {children}
          </ThemeContext>
        </AuthProvider>
      </body>
    </html>
  );
}
