import pic from "../assets/pic.png";
import { IoMdSettings } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDev } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Image } from "./Image";
import { Link } from "react-router-dom";
import axiosInstance from "../api/api";

export const ProfileCard = () => {
  const { theme } = useContext(ThemeContext);
  const [profile, setProfile] = useState({
    name: "",
    friends: [],
    image: { url: "" },
    comments: [],
    posts: [],
  });

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

  return (
    <section
      className={
        theme === "light"
          ? "flex flex-col items-center justify-center p-5 bg-white text-black shadow-md shadow-gray-400 w-full rounded"
          : "flex flex-col items-center justify-center p-5 bg-black text-white shadow-md shadow-gray-400 w-full rounded"
      }
    >
      <div className="flex items-center justify-center gap-5 border-b-2 p-3 w-full">
        <Image pic={profile.image.url || pic} />
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{profile.name}</h2>
          <h4>{profile.friends.length} friends</h4>
        </div>
        <Link to="/update-profile" className="ml-auto">
          <IoMdSettings size={24} />
        </Link>
      </div>

      <div className="border-b-2 p-3 flex flex-col items-start justify-start w-full">
        <h3 className="flex items-center gap-3 text-sm">
          <FaMapMarkerAlt /> <span className="text-gray-500">No Location Provided</span>
        </h3>
        <h3 className="flex items-center gap-3 text-sm">
          <FaDev /> <span className="text-gray-500">No Occupation Provided</span>
        </h3>
      </div>

      <div className="p-3 flex flex-col items-start justify-start w-full">
        <div className="py-2 flex items-center justify-between w-full text-sm">
          <p>Total Comments</p>
          <p>{profile.comments.length}</p>
        </div>
        <div className="py-2 flex items-center justify-between w-full text-sm">
          <p>Total Posts</p>
          <p>{profile.posts.length}</p>
        </div>
      </div>
    </section>
  );
};
