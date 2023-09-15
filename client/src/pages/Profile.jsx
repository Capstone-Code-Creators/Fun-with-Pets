import { useState, useEffect } from 'react';
import ProfileDataFetcher from '../components/ProfileDataFetcher';
import ProfileDeleteHandler from "../components/PostsDeleteHandler";


const Profile = ({ token }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);

    const formatUser = (user) => {
        return (
            <>
                <h2>Welcome, {user.firstName}</h2>
            </>
        )
    }

    const formatPosts = (post) => {
        return (
          <div key={`Post_${post.id}`}>
            <h2>Post #{post.id}</h2>
            <ul>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <img src={post.postImg} alt={`Post image ${post.id}`} />
            </ul>
          </div>
        );
    };

    const formatReplies = (reply) => {
        return (
          <div key={`Reply_${reply.id}`}>
            <h3>Reply #{reply.id}</h3>
            <ul>
              <h4>{reply.title}</h4>
              <p>{reply.content}</p>
              <h5>Likes: {reply.likes - reply.dilikes}</h5>   
            </ul>
          </div>
        );
    };  

const handleDeletePost = (postId) => {
  onDeletePost(postId);
}
    
  return (
    <div>

        {user && formatUser(user)}

        <button>Create a Post!</button>

        <ProfileDataFetcher token={token} setUser={setUser} setPosts={setPosts} setReplies={setReplies} />

        {posts.map((post) => {
            return formatPosts(post);
        })}

        {replies.map((reply) => {
            return formatReplies(reply);
        })}

        <ProfileDeleteHandler token={token} posts={posts} setPosts={setPosts} onDeletePost={handleDeletePost} replies={replies} setReplies={setReplies} />
    </div>
  );
};

export default Profile;
