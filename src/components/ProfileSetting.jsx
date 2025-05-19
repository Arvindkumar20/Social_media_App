import { Image } from "./Image";
import axios from "axios";
import pic from "../assets/pic.png";
import { useRef, useState } from "react";

export const ProfileSetting = () => {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(pic);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("password", profileData.password);
      formData.append("location", profileData.location);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpdate = () => {
    imageRef.current.click();
  };

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center shadow-md shadow-gray-500 rounded p-5 w-1/2 mx-auto my-10">
      <h1 className="text-center font-semibold text-xl">User Profile Setting</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center my-2">
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
          <div>
            <Image
              pic={previewImage}
              onClick={handleImageUpdate}
              className="cursor-pointer rounded-full w-20 h-20 object-cover"
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
  );
};
