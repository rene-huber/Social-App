import Image from "next/image"



const User = async ({ item }) => {


  
  return (
    <div key={item.title}>
     
     
   
          <Image src={item.image} alt={item.title} width={30} height={30} />
   
      
    
 
     
 
      
     
    </div>
  );
};

export default User;
