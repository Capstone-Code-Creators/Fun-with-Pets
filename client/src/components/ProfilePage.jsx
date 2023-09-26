import IndividualPostsFetcher from './IndividualPostsFetcher';
import { useState, useEffect } from 'react';
import PetFetcher from './PetFetcher';
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
            <div className='profilePage'>
                <h1>Profile Page</h1>
                <div className='userDetails'>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Email:</strong> {user.email}</p>
                </div>
                {user.profilePic && (
                    <div>
                        <h2>Profile Picture</h2>
                        <img src={user.profilePic} alt="Profile" />
                    </div>
                )}
                <IndividualPostsFetcher /> 
                    <PetFetcher />
            </div>
        </>

    )
}

export default ProfileContent