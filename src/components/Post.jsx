import { useContext } from "react";
import pic from "../assets/pic.png";
import pic2 from "../assets/react.svg";
import { Image } from "../components/Image";
import { ThemeContext } from "../context/ThemeContext";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import { MdComment } from "react-icons/md";

export const Post = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section
        className={
          theme == "light"
            ? "my-5 w-full shadow-md shadow-gray-400 p-5 rounded"
            : "my-5 bg-black text-white w-full shadow-md shadow-gray-400 p-5 rounded"
        }
      >
        <div className="flex items-center justify-start gap-5 font-sans">
          <Image pic={pic} />
          <div>
            <p className="font-medium  text-md  "> Name</p>
            <p className="font-normal  text-sm "> location</p>
          </div>
        </div>
        <p className="font-normal  text-sm  p-4">Description</p>

        <div>
          <img src={pic} alt="post image" />
        </div>
        <div className="flex items-center justify-between mt-5">
          <button type="button" className="cursor-pointer">
            <AiFillLike size={25} />
          </button>
          <button type="button" className="cursor-pointer">
            <FaShareNodes size={25} />
          </button>
          <button type="button" className="cursor-pointer">
            <MdComment size={25} />
          </button>
        </div>
      </section>
    </>
  );
};
