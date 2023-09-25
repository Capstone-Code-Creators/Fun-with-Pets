import { useState, useEffect } from 'react';

const ProfileDataFetcher = ({ setUser }) => {
    useEffect(() => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("id")
   
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`/api/user/${userId}`, {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                setUser(userData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData();
    }, [setUser]);

    return null; 
};

export default ProfileDataFetcher;