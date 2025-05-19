import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image } from "../components/Image";
import { ThemeContext } from "../context/ThemeContext";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import { MdComment } from "react-icons/md";

export const Post = ({ postId: propPostId }) => {
  const { theme } = useContext(ThemeContext);
  const { postId: routePostId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const postId = propPostId || routePostId;

  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/post/${postId}`);
      setPost(res.data.post);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/post/${postId}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post shared successfully!");
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/post/${postId}/comment`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText("");
      fetchPost();
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  if (!post) {
    return <p className="text-center my-10">Loading post...</p>;
  }

  return (
    <section
      className={
        theme === "light"
          ? "w-1/2 shadow-md shadow-gray-400 p-5 rounded mx-auto my-20"
          : "w-1/2 mx-auto my-20 bg-black text-white shadow-md shadow-gray-400 p-5 rounded"
      }
    >
      <div className="flex items-center justify-start gap-5 font-sans">
        <Image pic={post?.author?.image?.url || "/default-user.png"} />
        <div>
          <p className="font-medium text-md">{post.author?.name}</p>
          <p className="font-normal text-md">{post.author?.email}</p>
          <p className="font-normal text-sm">{post.author?.location}</p>
        </div>
      </div>

      <p className="font-normal text-sm p-4">{post.description}</p>

      {post?.image && (
        <div>
          <img
            src={post.image}
            alt="post"
            className="w-full max-h-[500px] object-cover rounded"
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-5">
        <button onClick={handleLike} className="cursor-pointer flex items-center gap-1">
          <AiFillLike size={25} /> <span>{post.likes?.length || 0}</span>
        </button>
        <button onClick={handleShare} className="cursor-pointer">
          <FaShareNodes size={25} />
        </button>
        <div className="flex gap-2 items-center">
          <MdComment size={25} />
          <input
            type="text"
            name="content"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment"
            className="p-1 border rounded text-black text-sm"
          />
          <button
            onClick={handleComment}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
          >
            Post
          </button>
        </div>
      </div>

      {/* Optional: Show Comments */}
      {post.comments?.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <ul className="space-y-2">
            {post?.comments?.map((c, index) => (
              <li key={index} className="text-sm bg-gray-100 p-2 rounded text-black">
                <Image pic={c.commentedBy?.image?.url || "/default-user.png"} />
                <span className="font-semibold">{c.commentedBy?.name}</span>
                <p className="text-sm">{new Date(c.createdAt).toLocaleString()}</p>
                <p className="text-sm">{c.content}</p>
                
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
