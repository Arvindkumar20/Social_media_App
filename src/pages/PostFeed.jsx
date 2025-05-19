import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import { MdComment } from "react-icons/md";
import { Link } from "react-router-dom";

export const PostFeed = () => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/post");
        // console.log(response)
        setPosts(response.data.posts || response.data);
        setLoading(false);
      } catch (err) {
        // console.error("Error fetching posts:", err);
        setError("Failed to load posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  // Like post handler with toggle
  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/post/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update posts with new likedBy array from backend response
      const updatedLikedBy = res.data.likedBy;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likedBy: updatedLikedBy } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Share post handler
  const handleShare = async (postId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/post/${postId}/share`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const postLink = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(postLink);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, sharedBy: [...(post.sharedBy || []), "dummyUserId"] }
            : post
        )
      );

      alert("Post link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing post:", error);
      alert("Failed to copy post link!");
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading posts...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-red-600">{error}</p>
    );
  if (posts.length === 0)
    return <p className="text-center mt-5">No posts found.</p>;

  return (
    <>
      {posts.map((post) => (
        <section
          key={post._id}
          className={
            theme === "light"
              ? "my-5 w-full shadow-md shadow-gray-400 p-5 rounded"
              : "my-5 bg-black text-white w-full shadow-md shadow-gray-400 p-5 rounded"
          }
        >
          <div className="flex items-center justify-start gap-5 font-sans">
            <img
              src={post.author?.image?.url || "/default-profile-pic.png"}
              alt="author"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-md">
                {post.author?.name || "Unknown User"}
              </p>
              <p className="font-normal text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <Link to={`/post/${post._id}`} className="block mt-2">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="font-normal text-sm p-4">{post.description}</p>
          </Link>

          {post?.image && (
            <div>
              <img
                src={post.image}
                alt="post"
                className="max-h-96 w-full object-contain rounded"
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleLike(post._id)}
            >
              <AiFillLike size={25} />
              <span>{post.likedBy?.length || 0}</span>
            </button>

            <button
              type="button"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleShare(post._id)}
            >
              <FaShareNodes size={25} />
              <span>{post.sharedBy?.length || 0}</span>
            </button>

            <Link
              to={`/post/${post._id}#comments`}
              className="cursor-pointer flex items-center gap-1"
            >
              <MdComment size={25} />
              <span>{post.comments?.length || 0}</span>
            </Link>
          </div>
        </section>
      ))}
    </>
  );
};
