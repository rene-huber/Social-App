import Image from "next/image"
import Link from "next/link"
import dancingBaby from "../../public/dancingbaby.gif"

// const slugify = (str) => {
//   return str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };


const User = async ({ item }) => {
  
  // const slugifiedName = slugify(item.name);
 
  
  return (
    <div key={item.title}>
     
     
     <Link href={`/user/${item.id}`}>
     <p>{item.name}</p>

          <Image src={item?.image || dancingBaby } alt={item.title} width={30} height={30} />
   
        </Link>
    
 
     
 
      
     
    </div>
  );
};

export default User;
// import Image from "next/image"
// import Link from "next/link"
// import dancingBaby from "../../public/dancingbaby.gif"

// const slugify = (str) => {
//   return str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };


// const User = async ({ item }) => {
  
//   const slugifiedName = slugify(item.name);
 
  
//   return (
//     <div key={item.title}>
     
     
//      <Link href={`/user/${item.id}`}>
//      <p>
//   {item.name
//     .toLowerCase()
//     .substring(0, 11)
//     .replace(/^./, str => str.toUpperCase())}
// </p>

//           <Image src={item?.image || dancingBaby } alt={item.title} width={30} height={30} />
   
//         </Link>
    
 
     
 
      
     
//     </div>
//   );
// };

// export default User;
