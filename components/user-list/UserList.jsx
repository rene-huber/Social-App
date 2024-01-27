
import Image from "next/image";
import Card from "../card/Card";
import User from "../user/User";

// const getData = async () => {
//   const res = await fetch(
//     `http://localhost:3000/api/users`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed");
//   }
//  return res.json();
// }

//  const user = (await getData()).filter(item => item.email === autorEmail);

const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error(`err: ${res.status}`);
      }
      const data = await res.json();
    //   console.log("Fetched data:", data); // Debug log
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }


  const UserList = async (autorEmail) => {
   

    const data = await getData();
    const user = data.filter(item => item.email === autorEmail.authorEmail);
    // console.log(user, "user");
    return (
        <div>
            {user?.map((item) => (
                <User item={item} key={item.title} />
            ))}
        </div>
    );



};

export default UserList;