import { FriendList } from "../components/FriendList";
import { PostForm } from "../components/PostForm";
import { ProfileCard } from "../components/ProfileCard";
import { PostFeed } from "./PostFeed";

export const Home = () => {
  return (
    <>
      <div className="flex items-start justify-evenly  my-20">
      <div className="w-1/3">
      <ProfileCard />
      <FriendList/>
      </div>
        <div className="w-1/2">
          <PostForm />
          <PostFeed />
        </div>
      </div>
    </>
  );
};
