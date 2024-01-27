import { Inter } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
            <Navbar />
          {/* <UserList /> */}
            
      
            {children}
         
      </body>
    </html>
  );
}
