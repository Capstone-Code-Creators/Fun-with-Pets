import { useState, useEffect } from 'react';

const Profile = ({ token }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch('../../../server/api/user/', {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                });
                const userData = await response.json();
                setUser(userData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
    
        const fetchPosts = async () => {
          const result = await fetch("/api/posts", {
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          });
          const data = await result.json();
          setPosts(data);
        };
    
        fetchPosts();
      }, []);

    useEffect(() => {
    
        const fetchReplies = async () => {
          const result = await fetch("/api/replies", {
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          });
          const data = await result.json();
          setReplies(data);
        };
    
        fetchReplies();
      }, []);

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
              <h5>Likes: {post.likes - post.dilikes}</h5>   
              {/* Need to change likes and dislikes to integer values to count em */}
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

  return (
    <div>
        {/* Need User to be pulled from logged in user from backend */}
        {user && formatUser(user)}
        {/* Create Route for Post page off of button  */}
        <button>Create a Post!</button>
        {/* Create map function to pull dummy post data */}
        {posts.map((post) => {
            return formatPosts(post);
        })}
        {/* Create map function to associate replies with appropriate dummy post data */}
        {replies.map((reply) => {
            return formatReplies(reply);
        })}
    </div>
  );
}


export default Profile;


