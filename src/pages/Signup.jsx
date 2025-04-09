import { useContext, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const Signup = () => {
  const imageRef = useRef();

  const { theme } = useContext(ThemeContext);
  const handleImageChange = (e) => {};

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  return (
    <>
      <div className="flex items-center justify-center mx-auto my-20 ">
        <form
          className={
            theme == "light"
              ? "p-5 shadow-md shadow-gray-400 w-1/2 bg-gray-700 text-white"
              : "p-5 shadow-md shadow-gray-400 w-1/2"
          }
        >
          <div className="flex items-center justify-center gap-5">
            <input
              type="text"
              placeholder="First Name..."
              name="fisrtName"
              className="w-1/2 p-3 border-2 outline-none rounded "
              required
            />
            <input
              type="text"
              placeholder="Last Name..."
              name="lastName"
              className="w-1/2 p-3 border-2 outline-none rounded"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Your location..."
            name="location"
            className="w-full p-3 border-2 outline-none rounded my-5"
          />
          <input
            type="text"
            placeholder="Ocupation..."
            name="occupation"
            className="w-full p-3 border-2 outline-none rounded "
          />
          <input
            type="file"
            accept="image/*"
            placeholder="Add Picture Here..."
            name="image"
            className="w-full p-3 border-2 outline-none rounded hidden "
            onChange={handleImageChange}
            ref={imageRef}
          />
          <div className="p-5 w-full border-2 my-5 rounded">
            <button
              type="button"
              className="outline-none border-2 border-dotted p-4 w-full rounded cursor-pointer"
              onClick={handleImageUpload}
            >
              Add Picture Here...
            </button>
          </div>
          <input
            type="email"
            placeholder="Your Email..."
            name="email"
            className="w-full p-3 border-2 outline-none rounded "
            required
          />
          <input
            type="password"
            placeholder="password..."
            name="password"
            className="w-full p-3 border-2 outline-none rounded my-5"
            required
          />
          <button
            type="submit"
            className="w-full p-3 border-2 outline-none rounded my-5 bg-blue-400 text-white font-medium text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
