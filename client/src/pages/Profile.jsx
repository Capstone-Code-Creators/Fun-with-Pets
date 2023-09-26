import { useState, useEffect } from 'react';
import ProfileDataFetcher from '../components/ProfileDataFetcher';

import PostsDeleteHandler from '../components/PostsDeleteHandler';
import ProfileContent from '../components/ProfilePage';

const Profile = ({ token }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);

    const formatUser = (user) => {
        return (
            <>
                <div id='welcomeUser'>
                <h2>Welcome, {user.firstName}</h2>
                </div>
            </>
        );
    };

    const formatReplies = (reply) => {
        return (
            <div key={`Reply_${reply.id}`}>
                <h3>Reply #{reply.id}</h3>
                <ul>
                    <h4>{reply.title}</h4>
                    <p>{reply.content}</p>
                    <h5>Likes: {reply.likes - reply.dilikes}</h5>
                </ul>
            </div>
        );
    };

    const handleDeletePost = (postId) => {
        onDeletePost(postId);
    };

    return (
        <div >
            {user && formatUser(user)}

            {/* <button>Create a Post!</button> */}

            <ProfileDataFetcher
                token={token}
                setUser={setUser}
                setPosts={setPosts}
                setReplies={setReplies}
            />

            <ProfileContent setUser={setUser} user={user} />

            {replies.map((reply) => {
                return formatReplies(reply);
            })}
        </div>
    );
};

export default Profile;
