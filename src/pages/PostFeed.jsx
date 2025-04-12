import pic from "../assets/pic.png";
import pic2 from "../assets/react.svg"
import { Image } from "../components/Image";
export const PostFeed = () => {
  return (
    <>
      <section className="my-5 w-full shadow-2xl shadow-gray-500 p-5">
        <div className="flex items-center justify-start gap-5 font-sans">
          <Image pic={pic}/> 
          <div>
            <p className="font-medium  text-md  text-gray-700"> Name</p>
            <p className="font-normal  text-sm text-gray-500"> location</p>
          </div>
        </div>
          <p className="font-normal  text-sm text-gray-500 p-4">Description</p>

          <div>
            <img src={pic} alt="post image" />
          </div>
      </section>
    </>
  );
};
