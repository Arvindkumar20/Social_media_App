import { useContext, useEffect, useRef, useState } from "react";
import pic from "../assets/pic.png";
import { IoImagesOutline } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";
import axiosInstance from "../api/api"; // make sure this uses your base URL
import axios from "axios";
import { Image } from "./Image";

export const PostForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    friends: [],
    image: { url: "" },
    comments: [],
    posts: [],
  });
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState({
    title: "",
    description: "",
  });
  const { theme } = useContext(ThemeContext);

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setDescription((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:5000/api/auth", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
console.log(res)
        const data = res.data;
        setProfile({
          name: data.name || "No Name",
          friends: data.friends || [],
          image: data.image || { url: "" },
          comments: data.comments || [],
          posts: data.posts || [],
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.title &&!description.description && !image) return;

    const formData = new FormData();
    formData.append("title", description.title);
    formData.append("description", description.description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/create",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post Created:", res);
      setDescription({
        title: "",
        description: "",
      });
      setImage(null);
      imageRef.current.value = ""; // Reset file input
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <>
      <section
        className={
          theme == "light"
            ? "bg-white shadow-md shadow-gray-400 rounded w-full p-5"
            : "bg-black text-white shadow-xl shadow-gray-500 rounded w-full p-5"
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-start gap-12 border-b-2 border-gray-500 p-5">
            <div className="w-16 h-16 rounded-full">
              <Image pic={profile.image.url} />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 w-full">
              <input
                type="text"
                placeholder="write something to post..."
                className="rounded-3xl py-2 px-3 w-5/6 border-2 bg-gray-200 text-black"
                name="title"
                value={description.title}
                onChange={handleChange}
              />
              <textarea
                type="text"
                placeholder="write something to post..."
                className="rounded-3xl py-3 px-5 w-5/6 border-2 bg-gray-200 text-black"
                name="description"
                value={description.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <section className="flex items-center justify-between p-3">
            <div>
              <input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={handleImageChange}
              />
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
