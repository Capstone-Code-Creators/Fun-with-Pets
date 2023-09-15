import { useState, useEffect } from 'react';

const ProfileDataFetcher = ({ token, setUser, setPosts, setReplies }) => {
    useEffect(() => {

        const fetchData = async () => {
            try {
                const userResponse = await fetch("/api/user", {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                setUser(userData);

                const postsResponse = await fetch("/api/posts", {
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                });
                const postsData = await postsResponse.json();
                setPosts(postsData);

                const repliesResponse = await fetch("/api/replies", {
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                });
                const repliesData = await repliesResponse.json();
                setReplies(repliesData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData();
    }, [token, setUser, setPosts, setReplies]);

    return null; 
};

export default ProfileDataFetcher;