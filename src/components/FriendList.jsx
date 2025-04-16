import { Image } from "./Image";
import pic from "../assets/pic.png";
import { Fa0 } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import { LiaCommentSolid } from "react-icons/lia";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const FriendList = () => {
  const friends = [
    {
      id: 1,
      name: "raj",
      image: pic,
      description: "hdgeygf",
      friends: 4,
      posts: 20,
      like: 10,
      share: 4,
    },
    {
      id: 2,
      name: "raj",
      image: pic,
      description: "hdgeygf",
      friends: 4,
      posts: 20,
      like: 10,
      share: 4,
    },
  ];
  const {theme}=useContext(ThemeContext);
  return (
    <>
      <section
        className={
          theme == "light"
            ? "w-full p-5 rounded shadow-md shadow-gray-400 mt-5 "
            : "w-full p-5 rounded shadow-md shadow-gray-400 mt-5 bg-black text-white"
        }
      >
        <h1 className="font-semibold py-3 text-xl">Friend's</h1>
        <ul className="flex flex-col items-center justify-center gap-5 ">
          {friends.map((friend) => {
            return (
              <li
                key={friend.id}
                className="flex items-center justify-between gap-5 p-2 w-full shadow-md shadow-gray-300 rounded"
              >
                <div>
                  <Image pic={friend.image} />
                </div>
                <div>
                  <p className="text-lg font-medium ">{friend.name}</p>
                  <p className="text-sm font-normal">{friend.description}</p>
                </div>
                <div>
                  <p className="text-sm font-normal flex items-center justify-start  gap-2">
                    {" "}
                    <FaUsers size={20} />{" "}
                    {friend.friends.length > 10
                      ? friend.friends
                      : `0${friend.friends}`}
                  </p>
                  <p className="text-sm font-normal flex items-center justify-start  gap-2">
                    {" "}
                    <AiFillLike />{" "}
                    {friend.like.length > 10 ? friend.like : `${friend.like}`}
                  </p>
                  <p className="text-sm font-normal flex items-center justify-start  gap-2">
                    {" "}
                    <FaShareNodes /> {friend.share}
                  </p>
                  <p className="text-sm font-normal flex items-center justify-start  gap-2">
                    {" "}
                    <LiaCommentSolid /> {friend.posts}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
