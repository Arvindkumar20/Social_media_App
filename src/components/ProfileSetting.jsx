import { Image } from "./Image";
import pic from "../assets/pic.png";
import { useRef, useState } from "react";
export const ProfileSetting = () => {
  const imageRef = useRef();
  const [profileData, setProfileData ] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(profileData);
  };

  const handleImageChange = (e) => {
    console.log(e);
  };

  const handleImageUpdate = (e) => {
    imageRef.current.click();
  };

  const handleChange = (e) => {
    setProfileData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  return (
    <>
      <section className="flex flex-col items-center justify-center shadow-md shadow-gray-500 rounded p-5 w-1/2 mx-auto my-10">
        <h1 className="text-center font-semibold text-xl ">
          User Profile Setting
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center my-2">
            <input
              type="file"
              className="hidden"
              ref={imageRef}
              accept="*/png,jpg,jpeg,gif"
              onChange={handleImageChange}
            />
            <div>
              <Image
                pic={pic}
                onClick={handleImageUpdate}
                className="cursor-pointer"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="User name..."
            className="p-3 border-2 rounded w-full"
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email ..."
            className="p-3 border-2 rounded w-full my-4"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password..."
            className="p-3 border-2 rounded w-full"
            name="password"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Location..."
            className="p-3 border-2 rounded w-full my-4"
            name="location"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center mx-auto">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-3 px-5 rounded cursor-pointer border-2 border-red-400"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
