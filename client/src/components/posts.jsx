import { useEffect, useState } from 'react';
import ProfileDataFetcher from './ProfileDataFetcher';
import PostsDeleteHandler from './PostsDeleteHandler';
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
    const [replies, setReplies] = useState([]);

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

        fetchPosts();
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

        if (response.ok) {
            setTitle('');
            setContent('');
            setImage('');

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
            setDislikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        }
    };

    const handleDislike = (postId) => {
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
            setLikedPosts((prev) => ({
                ...prev,
                [postId]: false,
            }));
        }
    };

    const handleCommentSubmit = (postId, commentText) => {
        const nextCommentId = comments[postId]?.length + 1 || 1; // Start commentId from 1
        setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), { id: nextCommentId, text: commentText }],
        }));
        setCurrentCommentText(''); 
    };

    const handleReplySubmit = async (postId, commentId, replyText) => {
        try {
            const response = await fetch('/api/replies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId, // Include postId
                    userId: user.id, // Include userId (assuming you have user data)
                    commentId, // Include commentId
                    replyText,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Assuming the response contains the ID of the newly created reply
                const highestReplyId = Math.max(
                    ...(replies[commentId] || []).map((reply) => reply.id),
                    0
                );
                const newReplyId = highestReplyId + 1;

                // Update the state with the new reply
                setReplies((prev) => ({
                    ...prev,
                    [commentId]: [...(prev[commentId] || []), 
                    { id: newReplyId, text: replyText }],
                }));
                setCurrentReplyText('');
            } else {
                console.error('Failed to add a new reply.');
            }
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleDeleteReply = async (postId, commentId, replyId) => {
        console.log(`Deleting reply: postId=${postId}, commentId=${commentId}, replyId=${replyId}`);
        try {
          const response = await fetch(`/api/replies/${replyId}`, {
            method: 'DELETE',
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
        //   setReplies((prevReplies) => {
        //     const newReplies = { ...prevReplies};

        //     // Initialize an empty array for the comment ID if it doesn't exist
        //     if (newReplies[commentId]) {
        //         newReplies[commentId] = newReplies[commentId].filter(
        //             (reply) => reply.id !== replyId
        //         );
        //     }

        //     return newReplies;
        //   });

            setReplies((prevReplies) => {
                const newReplies = { ...prevReplies };

                if (newReplies[commentId]) {
                    newReplies[commentId] = newReplies[commentId].filter(
                        (reply) => reply.id !== replyId
                    );
                }

                return newReplies;
            });
        } catch (error) {
          console.error('Error deleting reply:', error);
        }
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
                                />
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
                            <div className="post-actions">
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
                            <div className='comment-post'>
                                {comments[post.id]?.map((comment) => (
                                    <div key={`comment-${comment.id}`}>
                                        <div id='comment-output'>
                                        <p>{comment.text}</p>
                                        <button
                                            onClick={() =>
                                                handleDeleteReply(
                                                    post.id,
                                                    comment.id,
                                                    comment.replyId
                                                )
                                            }
                                    >
                                        X
                                    </button>
                                    </div>
                                    
                                    <div className="reply-section">
                                    {replies[comment.id]?.map((reply) => (
                                            <div id='reply-text-out' key={`reply-${reply.id}`}>
                                                <p>{reply.text}</p>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteReply(
                                                            post.id,
                                                            comment.id,
                                                            reply.id,
                                                        )
                                                    }
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
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

                                       
                                    </div>
                                </div>
                            
                            ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Posts;
