import { useState, useEffect } from 'react';

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../../../server/api/user/${userId}');
                if(!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData();
    }, [userId]);

  return (
    <div>
        {/* Need User to be pulled from logged in user from backend */}
        {user ? (
            <div>
                <h1>Welcome, {user.firstName}!</h1>
                <p>Email: {user.email}</p>
            </div>    
        ) : (
            <p>Loading user data...</p>
        )}
        {/* Create Route for Post page off of button  */}
        <button>Create a Post!</button>
        {/* Create map function to pull dummy post data */}
        <div>
            <h4>This will be a post</h4>
        </div>
        {/* Create map function to associate replies with appropriate dummy post data */}
        <div>
            <h5>This will be reply #1</h5>
        </div>
        <div>
            <h5>This will be reply #2</h5>
        </div>
    </div>
  );
}


export default Profile;


