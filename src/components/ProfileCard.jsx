import pic from "../assets/pic.png";
import { IoMdSettings } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDev } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Image } from "./Image";

export const ProfileCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section
        className={
          theme == "light"
            ? " flex flex-col items-center justify-center p-5 bg-white text-black shadow-2xl shadow-gray-500 w-1/4"
            : " flex flex-col items-center justify-center p-5 bg-black text-white shadow-2xl shadow-gray-500 w-1/4"
        }
      >
        <div className="flex items-center justify-between   border-b-2 p-3">
          <Image pic={pic} />
          <div>
            <h2 className="font-bold">Arvind Kumar</h2>
            <h4>3 friends</h4>
          </div>
          <p>
            <IoMdSettings />
          </p>
        </div>
        <div className="border-b-2 p-3 flex flex-col items-start justify-start">
          <h3 className="flex items-start justify-start gap-5">
            <FaMapMarkerAlt /> <span>Location</span>
          </h3>
          <h3 className="flex items-start justify-start gap-5">
            <FaDev /> <span>Developer</span>
          </h3>
        </div>
        <div className="border-b-2 p-3 flex flex-col items-start justify-start">
          <div className="py-2 flex items-center justify-center gap-5">
            <p>Whose viewed your profile</p>
            <p>120</p>{" "}
          </div>

          <div className="py-2 flex items-center justify-center gap-5">
            <p>Impressions of your post</p> <p>120</p>
          </div>
        </div>
      </section>
    </>
  );
};
