import { useContext, useRef, useState } from "react";
import pic from "../assets/pic.png";
import { IoImagesOutline } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";

export const PostForm = () => {
  const imageRef = useRef();
  const [image, setImage] = useState(null);

const {theme}=useContext(ThemeContext);

  const handleImageUpload = () => {
    imageRef.current.click();
  };
  return (
    <>
      <section
        className={
          theme == "light"
            ? "bg-white shadow-xl shadow-gray-500 rounded w-full p-5"
            : "bg-black text-white shadow-xl shadow-gray-500 rounded w-full p-5"
        }
      >
        <form>
          <div className="flex items-center justify-start gap-12 border-b-2 border-gray-500 p-5">
            <div className="w-12 h-12 rounded-full">
              <img
                src={pic}
                alt="profile pic"
                className="w-full h-full object-center rounded-full"
              />
            </div>
            <input
              type="text"
              placeholder="write something to post..."
              className="rounded-3xl py-3 px-5 w-5/6 border-2 bg-gray-200 text-black"
            />
          </div>

          <section className="flex items-center justify-between p-3">
            <div className="">
              <input type="file" className="hidden" ref={imageRef} />
              <button
                className="flex items-center justify-center gap-3 cursor-pointer"
                type="button"
                onClick={handleImageUpload}
              >
                <IoImagesOutline size={28} />
                <span className="text-lg font-normal">upload image</span>
              </button>
            </div>
            <button
              className="bg-blue-500 text-white rounded-md py-2 px-8"
              type="submit"
            >
              Post
            </button>
          </section>
        </form>
      </section>
    </>
  );
};
