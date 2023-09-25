import React, { useState, useEffect } from 'react';

const IndividualPostsFetcher = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
     
        const fetchData = async () => {
            try {
                const userPosts = await fetch(`/api/posts/user/${userId}`, {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                });
                const fetchedPosts = await userPosts.json();

                if (Array.isArray(fetchedPosts)) {
                    setPosts(fetchedPosts);
                } else {
                    console.error("Unexpected server response:", fetchedPosts);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
         
        fetchData();
    }, []);

    return (
        <div>
            <h2>My Posts</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default IndividualPostsFetcher;
