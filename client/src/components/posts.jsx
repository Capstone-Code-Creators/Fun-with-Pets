import { useEffect, useState } from 'react';
import ProfileDataFetcher from './ProfileDataFetcher';
import '../App.css';

const Posts = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postImg, setImage] = useState('');

    useEffect(() => {
        const postFetch = async () => {
            const postsResponse = await fetch('/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const postsData = await postsResponse.json();
            const sortedPosts = postsData.sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        };
        postFetch();
    }, []);

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

    const formatPosts = (post) => {
        return (
            <section className="post-box">
                <section className="img-box">
                    {/* <h3>{post.title}</h3> */}
                    <section>
                        <img
                            className="post-image"
                            src={post.postImg}
                            alt={`Post image ${post.id}`}
                        />
                    </section>
                    <section>
                        <section key={`Post_${post.id}`}>
                            <h2 id="user-title">
                                {user.firstName} {user.lastName}
                            </h2>
                            <section id="post-content">
                                <p id="post-text">
                                    {post.content.length > 400
                                        ? post.content.slice(0, 1000) + '...'
                                        : post.content}
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        );
    };

    return (
        <>
            <ProfileDataFetcher setUser={setUser} />
            <section className="post-container">
                <h1 id="post-title">What's on your mind...</h1>
                <section id="post-details">
                    <form onSubmit={addPost}>
                        {/* <label>Title: </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        /> */}
                        <section id="post-content-photo">
                            {/* <label>Content: </label> */}
                            <textarea
                                id="post-input-box"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
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
                {posts.map((post) => {
                    return formatPosts(post);
                })}
            </section>
        </>
    );
};

export default Posts;
