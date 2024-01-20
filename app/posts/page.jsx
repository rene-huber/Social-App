import CardList from "@/components/cardList/CardList";
import { getCurrentUser } from "@/utils/session";


const PostPage = async () => {
  const userr = await getCurrentUser();
  return (
    <>
      <CardList />

    </>
  );
};

export default PostPage;
