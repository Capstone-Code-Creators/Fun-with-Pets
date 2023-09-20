import { useEffect, useState } from 'react';
import ProfileDataFetcher from './ProfileDataFetcher';
import '../App.css';

const Posts = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [postImg, setImage] = useState('');
    const [currentCommentText, setCurrentCommentText] = useState('');

    const [likeCounts, setLikeCounts] = useState({});
    const [dislikeCounts, setDislikeCounts] = useState({});
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPosts(data.sort((a, b) => b.id - a.id));
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        fetchPosts();
    }, [token]);

    const handleLike = (postId) => {
        setLikeCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || 0) + 1
        }));
        // TODO: Update likes on the backend
    };

    const handleDislike = (postId) => {
        setDislikeCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || 0) + 1
        }));
        // TODO: Update dislikes on the backend
    };

    const handleCommentSubmit = (postId, commentText) => {
        setComments(prev => ({
            ...prev,
            [postId]: [...(prev[postId] || []), commentText]
        }));
        setCurrentCommentText('');  // Reset comment input
        // TODO: Update comment in the backend
    };

    return (
        <>
            <ProfileDataFetcher setUser={setUser} />
            <section className="post-container">
                <h1 id="post-title">What's on your mind...</h1>
                <section id="post-details">
                    {/* TODO: Add the addPost function and form */}
                </section>
            </section>
            <section className="feed">
                {posts.map(post => (
                    <div key={post.id} className="post-box">
                        <img
                            className="post-image"
                            src={post.postImg}
                            alt={`Post image ${post.id}`}
                        />
                        <h2 id="user-title">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p id="post-text">
                            {post.content.length > 400
                                ? post.content.slice(0, 400) + '...'
                                : post.content}
                        </p>
                        <button onClick={() => handleLike(post.id)}>
                            Like {likeCounts[post.id] || 0}
                        </button>
                        <button onClick={() => handleDislike(post.id)}>
                            Dislike {dislikeCounts[post.id] || 0}
                        </button>
                        <div className="comment-section">
                            <textarea 
                                placeholder="Add a comment..." 
                                value={currentCommentText}
                                onChange={(e) => setCurrentCommentText(e.target.value)} 
                            />
                            <button onClick={() => handleCommentSubmit(post.id, currentCommentText)}>
                                Comment
                            </button>
                        </div>
                        {/* Display comments for the post */}
                        <div>
                            {comments[post.id]?.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Posts;
