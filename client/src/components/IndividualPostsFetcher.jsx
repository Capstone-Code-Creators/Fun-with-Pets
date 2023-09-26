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
        <div className='userPost'>
            <h2>My Posts</h2>
            {posts.map((post) => (
                <div
                className='userPostBox'
                 key={post.id}>
                    <h3>{post.title}</h3>
                    <div id='userPostContent'>
                    <img id='userImg' src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" />
                    <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IndividualPostsFetcher;
