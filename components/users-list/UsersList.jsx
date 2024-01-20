
import Image from "next/image";
import Card from "../card/Card";
import User from "../user/User";

const getData = async (page, cat) => {
  const res = await fetch(
    `/api/users`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }
 return res.json();
}





const UserList = async () => {
  const user = await getData();






return  <div>
{user?.map((item) => (
 <User item={item} key={item.title} />
))}
</div>

};

export default UserList;
