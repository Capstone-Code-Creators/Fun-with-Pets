import { useState, useEffect } from "react";
import POSTS from "../components/posts";

// eslint-disable-next-line react/prop-types
const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Fetch user data
        const userResponse = await fetch("/api/user", requestOptions);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch posts
        const postsResponse = await fetch("/api/posts", requestOptions);
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch replies
        const repliesResponse = await fetch("/api/replies", requestOptions);
        if (!repliesResponse.ok) throw new Error("Failed to fetch replies");
        const repliesData = await repliesResponse.json();
        setReplies(repliesData);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [token]);

  const formatUser = (user) => <h2>Welcome, {user.firstName}</h2>;

  const formatPosts = (post) => (
    <section key={`Post_${post.id}`}>
      <h2>Post #{post.id}</h2>
      <ul>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <img src={post.postImg} alt={`Post image ${post.id}`} />
        <h5>Likes: {post.likes - post.dilikes}</h5>
      </ul>
    </section>
  );

  const formatReplies = (reply) => (
    <section key={`Reply_${reply.id}`}>
      <h3>Reply #{reply.id}</h3>
      <ul>
        <h4>{reply.title}</h4>
        <p>{reply.content}</p>
        <h5>Likes: {reply.likes - reply.dilikes}</h5>
      </ul>
    </section>
  );

  return (
    <section>
      {user && formatUser(user)}
      <button>Create a Post!</button>
      <POSTS />
      {posts.map((post) => formatPosts(post))}
      {replies.map((reply) => formatReplies(reply))}
    </section>
  );
};

export default Profile;
