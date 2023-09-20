import { useEffect, useState } from 'react';
import ProfileDataFetcher from './ProfileDataFetcher';
import Comment from './commet';
import '../App.css';

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

const Posts = () => {
    const token = localStorage.getItem('token');

    // State declarations
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postImg, setImage] = useState('');
    const [likeCounts, setLikeCounts] = useState({});
    const [dislikeCounts, setDislikeCounts] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([
        { postId: 1, commentId: 1, text: "This is a comment for post 1" }
    ]);

    // Event Handlers
    const handleLikeClick = (postId) => {
        setLikeCounts((prev) => ({
            ...prev,
            [postId]: (prev[postId] || 0) + 1,
        }));
    };

    const handleDislikeClick = (postId) => {
        setDislikeCounts((prev) => ({
            ...prev,
            [postId]: (prev[postId] || 0) + 1,
        }));
    };

    const handleCommentClick = (post) => {
        setSelectedPost(post);
        setModalVisible(true);
    };

    const handleAddComment = (postId, text) => {
        const newComment = {
            postId,
            commentId: Math.random(),
            text
        };
        setComments((prevComments) => [...prevComments, newComment]);
    };

    // Effects
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPosts(data.sort((a, b) => b.id - a.id));
        };
        fetchPosts();
    }, [token]);

    const addPost = async (e) => {
        e.preventDefault();

        const newPost = { title, content, postImg };
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            const data = await response.json();
            setPosts((prevPosts) => [data, ...prevPosts]);
            setTitle('');
            setContent('');
            setImage('');
        } else {
            console.error('Failed to add a new post.');
        }
    };

    return (
        <>
            <ProfileDataFetcher setUser={setUser} />
            <section className="post-container">
                <h1 id="post-title">What's on your mind...</h1>
                <section id="post-details">
                    <form onSubmit={addPost}>
                        <section id="post-content-photo">
                            <textarea
                                id="post-input-box"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <label>Add Image: </label>
                            <input
                                type="text"
                                value={postImg}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </section>
                    </form>
                </section>
            </section>
            <section className="feed">
                {posts.map((post) => (
                    <section key={post.id} className="post-box">
                        {/* ... Rest of your post formatting code */}
                        <Comment comments={comments.filter(c => c.postId === post.id)} />
                        {/* ... Add a comment form or button if required */}
                    </section>
                ))}
            </section>
            {isModalVisible && (
                <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
                    {/* Render the selected post and its comments inside the modal */}
                    {/* ... */}
                </Modal>
            )}
        </>
    );
};

export default Posts;
