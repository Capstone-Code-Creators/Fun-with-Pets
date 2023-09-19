import { useEffect, useState } from "react";
import ProfileDataFetcher from "./ProfileDataFetcher";

const Posts = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImg, setImage] = useState("");
  
  useEffect(() => {
    const postFetch = async () => {
      const postsResponse = await fetch("/api/posts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const postsData = await postsResponse.json();
      setPosts(postsData);
    }
    postFetch();
  }, []);
  
  const addPost = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ title, content, postImg });
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body,
    });
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      
      setTitle("");
      setContent("");
      setImage("");
      
      // Fetch the updated list of posts
      const updatedPostsResponse = await fetch("/api/posts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const updatedPostsData = await updatedPostsResponse.json();
      setPosts(updatedPostsData);
    } else {
      console.error('Failed to add a new post.');
    }
  }
  
  const formatPosts = (post) => {
    return (
      <div key={`Post_${post.id}`}>
        <h2>User: {user.firstName} {user.lastName}</h2>
        <ul>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <img src={post.postImg} alt={`Post image ${post.id}`} />
        </ul>
      </div>
    );
  };
  
  return (
    <>
    <ProfileDataFetcher setUser={setUser}/>
      <section>
        <h1>What's on your mind...</h1>
        <section>
          <p>Tell us about your pet.</p>
          <form onSubmit={addPost}>
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Content: </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <label>Image URL: </label>
            <input
              type="text"
              value={postImg}
              onChange={(e) => setImage(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </section>
      <section>
        {posts.map((post) => {
          return formatPosts(post);
        })}
      </section>
    </>
  );
};

export default Posts;
