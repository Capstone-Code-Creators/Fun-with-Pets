import IndividualPostsFetcher from './IndividualPostsFetcher';
import { useState, useEffect } from 'react';
const ProfileContent = ({setUser, user}) => {
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("id")
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`/api/user/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
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

    return (
        <>
            <div>
                <h1>Profile Page</h1>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Email:</strong> {user.email}</p>
              
                {user.profilePic && (
                    <div>
                        <h2>Profile Picture</h2>
                        <img src={user.profilePic} alt="Profile" />
                    </div>
                )}
                <IndividualPostsFetcher /> 

            </div>
        </>

    )
}

export default ProfileContent