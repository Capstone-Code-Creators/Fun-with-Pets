import { useEffect, useState } from 'react';
import ProfileDataFetcher from './ProfileDataFetcher';
import handleDeletePost from './PostsDeleteHandler';
import '../App.css';

const Posts = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [postImg, setImage] = useState('');
    const [currentCommentText, setCurrentCommentText] = useState('');

    const [likedPosts, setLikedPosts] = useState({});
    const [dislikedPosts, setDislikedPosts] = useState({});
    const [comments, setComments] = useState({});
    const [currentReplyText, setCurrentReplyText] = useState('');
    const [replies, setReplies] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPosts(data.sort((a, b) => b.id - a.id));
                } else {
                    console.error('Unexpected server response:', data);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts(); // This is the line you missed
    }, [token]);

    const addPost = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({ title, content, postImg });
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body,
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setTitle('');
            setContent('');
            setImage('');

            // Fetch the updated list of posts
            const updatedPostsResponse = await fetch('/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedPostsData = await updatedPostsResponse.json();
            setPosts(updatedPostsData);
        } else {
            console.error('Failed to add a new post.');
        }
    };

    const handleLike = (postId) => {
        // If post is already liked, then unlike it. Otherwise, like it.
        if (likedPosts[postId]) {
            setLikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        } else {
            setLikedPosts((prev) => ({
                ...prev,
                [postId]: true,
            }));
            // Also, ensure it's not disliked
            setDislikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        }
    };

    const handleDislike = (postId) => {
        // If post is already disliked, then undislike it. Otherwise, dislike it.
        if (dislikedPosts[postId]) {
            setDislikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        } else {
            setDislikedPosts((prev) => ({
                ...prev,
                [postId]: true,
            }));
            // Also, ensure it's not liked
            setLikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        }
    };

    const handleCommentSubmit = (postId, commentText) => {
        setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), commentText],
        }));
        setCurrentCommentText(''); // Reset comment input
        // TODO: Update comment in the backend
    };
    const handleReplySubmit = (postId, commentId, replyText) => {
        setReplies((prev) => ({
            ...prev,
            [commentId]: [...(prev[commentId] || []), replyText],
        }));
        setCurrentReplyText('');
    };

    return (
        <>
            <ProfileDataFetcher setUser={setUser} />
            <section className="post-container">
                <h1 id="post-title">What's on your mind...</h1>
                <section id="post-details">
                    <p>Tell us about your pet.</p>
                    <div id="post-input-box">
                        <form onSubmit={addPost}>
                            <div>
                                <label>Content: </label>
                                <textarea
                                    id="text-area"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label>Image URL: </label>
                                <input
                                    id="img-input"
                                    type="text"
                                    value={postImg}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
            <section className="feed">
                {posts.map((post) => (
                    <div key={post.id} className="post-box">
                        <div id="post-header">
                            <h2 id="user-title">
                                {user.firstName} {user.lastName}
                            </h2>
                            <div>
                                <button
                                    onClick={() => handleLike(post.id)}
                                    style={{
                                        color: likedPosts[post.id]
                                            ? 'blue'
                                            : 'black',
                                    }}
                                >
                                    Like
                                </button>
                                <button
                                    onClick={() => handleDislike(post.id)}
                                    style={{
                                        color: dislikedPosts[post.id]
                                            ? 'red'
                                            : 'black',
                                    }}
                                >
                                    Dislike
                                </button>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    X
                                </button>
                            </div>
                        </div>

                        <img
                            className="post-image"
                            src={post.postImg}
                            alt={`Post image ${post.id}`}
                        />

                        <p id="post-text">
                            {post.content.length > 400
                                ? post.content.slice(0, 400) + '...'
                                : post.content}
                        </p>

                        <div className="comment-section">
                            <div>
                            <textarea
                                placeholder="Add a comment..."
                                value={currentCommentText}
                                onChange={(e) =>
                                    setCurrentCommentText(e.target.value)
                                }
                            />
                            <button
                                onClick={() =>
                                    handleCommentSubmit(
                                        post.id,
                                        currentCommentText,
                                    )
                                }
                            >
                                Comment
                            </button>
                            </div>
                            <div>       
                            {comments[post.id]?.map((comment, commentIndex) => (
                                <div key={commentIndex}>
                                    <p>{comment.text}</p>
                                    {/* <button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    >
                                        X
                                    </button> */}

                                    {/* Reply to Comment */}
                                    <div style={{ marginLeft: '30px' }}>
                                        <textarea
                                            placeholder="Reply to this comment..."
                                            value={currentReplyText}
                                            onChange={(e) =>
                                                setCurrentReplyText(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleReplySubmit(
                                                    post.id,
                                                    comment.id,
                                                    currentReplyText,
                                                )
                                            }
                                        >
                                            Reply
                                        </button>

                                        {/* Display replies for the comment */}
                                        {replies[comment.id]?.map(
                                            (reply, replyIndex) => (
                                                <p key={replyIndex}>{reply}</p>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                            </div> 
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
