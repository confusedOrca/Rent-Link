/*
  Show ad posts of user
*/
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MyPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axiosPrivate.get("/getuserposts");
        setPosts(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="cardsBox overflow-x-auto flex space-x-8 py-2 text-[1.2rem]">
        {posts.map((post) => {
          var image = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-21.png";
          if (post.img.length > 0) {
            image = post.img[0].replace("http:\\", "http:\\\\");
          }
          return (
            <PostCard
              key={post._id}
              address={post.locationName}
              rent={post.rent}
              size={post.size}
              id={post._id}
              imageUrl={image}
              cid={post._creator}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyPost;
