import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axiosInstance from "../api/api.js";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }
    setError("");
    setImage(file);
  };

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const handleChange = (e) => {
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(signUpData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (image) {
        formData.append("image", image);
      }
      const data = {
      
        name: signUpData.firstName + " " + signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password,
        location: signUpData.location,
        occupation: signUpData.occupation,
        image: image,
      };
      // if (!data.firstName || !data.lastName || !data.email || !data.password) {
      //   setError("Please fill in all required fields");
      //   return;
      // }
      if (data.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      if (!image) {
        setError("Please upload a profile picture");
        return;
      }
      const res = await axiosInstance.post(
        "/auth/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Registered:", res.data);
        navigate("/"); // Redirect to home page
      } else {
        setError(res.data.message);
      }
      alert("Signup successful!");

      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
      });
      setImage(null);
      imageRef.current.value = ""; // clear file input
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto my-20">
      <form
        onSubmit={handleSubmit}
        className={
          theme === "light"
            ? "p-5 shadow-md shadow-gray-400 w-1/2 bg-gray-700 text-white"
            : "p-5 shadow-md shadow-gray-400 w-1/2"
        }
      >
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}

        <div className="flex items-center justify-center gap-5">
          <input
            type="text"
            placeholder="First Name..."
            name="firstName"
            className="w-1/2 p-3 border-2 outline-none rounded"
            onChange={handleChange}
            value={signUpData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name..."
            name="lastName"
            className="w-1/2 p-3 border-2 outline-none rounded"
            onChange={handleChange}
            value={signUpData.lastName}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Your location..."
          name="location"
          className="w-full p-3 border-2 outline-none rounded my-5"
          onChange={handleChange}
          value={signUpData.location}
        />
        <input
          type="text"
          placeholder="Occupation..."
          name="occupation"
          className="w-full p-3 border-2 outline-none rounded"
          onChange={handleChange}
          value={signUpData.occupation}
        />

        <input
          type="file"
          accept="image/*"
          name="image"
          className="hidden"
          onChange={handleImageChange}
          ref={imageRef}
        />
        <div className="p-5 w-full border-2 my-5 rounded">
          <button
            type="button"
            className="outline-none border-2 border-dotted p-4 w-full rounded cursor-pointer"
            onClick={handleImageUpload}
          >
            {image ? image.name : "Add Picture Here..."}
          </button>
        </div>

        <input
          type="email"
          placeholder="Your Email..."
          name="email"
          className="w-full p-3 border-2 outline-none rounded"
          onChange={handleChange}
          value={signUpData.email}
          required
        />
        <input
          type="password"
          placeholder="Password..."
          name="password"
          className="w-full p-3 border-2 outline-none rounded my-5"
          onChange={handleChange}
          value={signUpData.password}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 border-2 outline-none rounded my-5 bg-blue-400 text-white font-medium text-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
