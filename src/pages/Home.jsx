import { PostForm } from "../components/PostForm";
import { ProfileCard } from "../components/ProfileCard";
import { PostFeed } from "./PostFeed";

export const Home = () => {
  return (
    <>
      <div className="flex items-start justify-evenly my-20">
        <ProfileCard />
        <div className="w-1/2">
          <PostForm />
          <PostFeed />
        </div>
      </div>
    </>
  );
};
